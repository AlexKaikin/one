'use server'

import { NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { PostService } from './services'

export async function POST(request: Request) {
  try {
    await connectDB()

    const product = await PostService.create(request)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const { posts, total } = await PostService.getAll(request)
    const response = NextResponse.json(posts)
    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
