import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { ChatService } from '../services'

type Params = {
  chat: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    await connectDB()
    const chatId = context.params.chat
    const chat = await ChatService.getOne(request, chatId)

    if (!chat) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(chat)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
