'use server'

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { ChatService } from './services'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const note = await ChatService.create(request)

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { chats, total } = await ChatService.getAll(request)
    const response = NextResponse.json(chats)
    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
