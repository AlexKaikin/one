'use server'

import { NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { CommentService } from './services'

export async function POST(request: Request) {
  try {
    await connectDB()

    const data = await request.json()
    const comment = await CommentService.create(data)

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const { comments, total } = await CommentService.getAll(request)
    const response = NextResponse.json(comments)
    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
