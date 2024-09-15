import { NextRequest } from 'next/server'
import { ChatModel } from '../chats/model'
import { MessageModel } from './model'

export const MessageService = {
  create: async (request: NextRequest) => {
    const data = await request.formData()

    const newMessage = {
      text: data.get('text'),
      sender: data.get('sender'),
      chat: data.get('chat'),
      read: data.getAll('read[]'),
    }

    const message = await MessageModel.create(newMessage)
    await ChatModel.findByIdAndUpdate(message.chat, {
      lastMessage: message.id,
    })

    return message.populate(populateParams)
  },

  getAll: async (request: NextRequest) => {
    const { query, fields, pagination } = getFindParams(request)
    const { searchParams } = new URL(request.url)
    const prev = searchParams.get('prev')
    const messages = await MessageModel.find(query, fields, pagination).populate(populateParams)

    return prev ? messages.reverse() : messages
  },

  getOne: async (id: string) => {
    return await MessageModel.findById(id)
  },

  update: async (id: string, request: NextRequest) => {
    const data = await request.json()

    const message = await MessageModel.findByIdAndUpdate(id, data, {
      new: true,
    })

    return message
  },

  updateMany: async (request: NextRequest) => {
    const data = (await request.json()) as { _id: string; read: string[] }[]
    const writeOperations = data.map(({ _id, read }) => ({ updateOne: { filter: { _id }, update: { read } } }))

    return await MessageModel.bulkWrite(writeOperations)
  },

  remove: async (id: string) => {
    return await MessageModel.findByIdAndDelete(id)
  },
}

function getFindParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') || 20)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit

  const chat = searchParams.get('chat')
  const next = searchParams.get('next')
  const prev = searchParams.get('prev')
  const sortParams = { createdAt: prev ? -1 : 1 }

  if (!chat) {
    throw new Error()
  }

  const query: any = { chat }

  if (next) {
    query._id = { $gt: next }
  }

  if (prev) {
    query._id = { $lt: prev }
  }

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }
  return { query, fields, pagination }
}

const populateParams = {
  path: 'sender',
  populate: {
    path: 'profile',
  },
}
