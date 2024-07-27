'use server'

import { NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { ReviewService } from './services'

export async function POST(request: Request) {
  try {
    await connectDB()

    const data = await request.json()
    const review = await ReviewService.create(data)

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const { reviews, total } = await ReviewService.getAll(request)
    const response = NextResponse.json(reviews)
    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
