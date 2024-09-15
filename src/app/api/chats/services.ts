import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { Chat, User } from '@/types'
import { MessageModel } from '../messages/model'
import { ProfileModel } from '../profiles/model'
import { UserModel } from '../users/model'
import { ChatModel } from './model'

export const ChatService = {
  create: async (request: NextRequest) => {
    const data = await request.formData()
    const newChat = {
      users: data.get('users[]'),
    }

    return await ChatModel.create(newChat)
  },
  getAll: async (request: NextRequest) => {
    const { query, fields, pagination } = await getFindParams(request)
    const total = await ChatModel.countDocuments(query)

    const chats = (await ChatModel.find(query, fields, pagination)
      .populate('lastMessage')
      .populate({
        path: 'users',
        populate: { path: 'profile', model: ProfileModel },
      })) as Chat[]

    return { chats, total }
  },

  getOne: async (req: NextRequest, chatId: string) => {
    const secret = process.env.NEXTAUTH_SECRET
    const user = (await getToken({ req, secret })) as User

    if (!user) return

    const chat = await ChatModel.findOne({
      _id: chatId,
      users: { $in: [user.id] },
    }).populate({
      path: 'users',
      populate: {
        path: 'profile',
        model: ProfileModel,
      },
    })

    if (!chat) null

    const messages = await getMessages(user.id, chatId)

    return { chat, messages }
  },

  getOneOrCreate: async (req: NextRequest, userId: string) => {
    const secret = process.env.NEXTAUTH_SECRET
    const user = (await getToken({ req, secret })) as User

    if (!user) return

    let chat = await ChatModel.findOne({
      users: { $all: [userId, user.id] },
    })

    if (!chat) {
      chat = await ChatModel.create({ users: [userId, user.id] })
    }

    return chat
  },
}

async function getFindParams(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET
  const user = (await getToken({ req, secret })) as User

  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const sort = 'updatedAt'
  const order = -1
  const sortParams = { [sort]: order }
  const name = searchParams.get('user')

  const users = await UserModel.find({
    _id: { $ne: user.id },
    $or: [{ lastName: { $regex: name || '', $options: 'i' } }, { firstName: { $regex: name || '', $options: 'i' } }],
  })

  const query: any = {
    $and: [{ users: { $in: [...users] } }, { users: user.id }],
  }

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }

  return { query, fields, pagination }
}

async function getMessages(userId: string, chatId: string) {
  const firstUnreadMessage = await MessageModel.findOne(getFindOneParams(userId, chatId)).sort({ createdAt: 1 })

  if (firstUnreadMessage) {
    const beforeMessages = await MessageModel.find({
      chat: chatId,
      _id: { $lte: firstUnreadMessage._id },
    })
      .populate(populateParams)
      .sort({ createdAt: -1 })
      .limit(20)

    const afterMessages = await MessageModel.find({
      chat: chatId,
      _id: { $gt: firstUnreadMessage._id },
    })
      .populate(populateParams)
      .sort({ createdAt: 1 })
      .limit(20)

    const messages = [...beforeMessages.reverse(), ...afterMessages]

    return messages
  } else {
    const messages = await MessageModel.find({ chat: chatId })
      .populate(populateParams)
      .limit(20)
      .sort({ createdAt: -1 })

    return messages.reverse()
  }
}

const populateParams = {
  path: 'sender',
  populate: {
    path: 'profile',
  },
}

function getFindOneParams(userId: string, chatId: string) {
  const result: any = {
    chat: chatId,
    sender: { $ne: userId },
    read: { $nin: [userId] },
  }

  return result
}
