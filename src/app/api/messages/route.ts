'use server'

import { NextRequest, NextResponse } from 'next/server'
import Pusher from 'pusher'
import { connectDB } from '@/configs'
import { PUSHER_APP_CLUSTER, PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_SECRET } from '@/constants'
import { Message } from '@/types'
import { ChatModel } from '../chats/model'
import { MessageService } from './services'

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_APP_KEY,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  useTLS: true,
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const message = (await MessageService.create(request)) as Message
    const chat = await ChatModel.findById(message.chat)

    chat.users.forEach((user: string) => {
      pusher.trigger(`message-to-${user}`, 'message', { message })
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const messages = await MessageService.getAll(request)
    const response = NextResponse.json(messages)

    return response
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB()

    const response = await MessageService.updateMany(request)

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
