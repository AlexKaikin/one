'use server'

import { NextResponse } from 'next/server'
import { connectDB } from '@/config/db'
import { type Review, ReviewModel } from '../../../app/api/reviews/model'

export async function POST(request: Request) {
  try {
    await connectDB()

    const data = await request.json()
    const review = await ReviewModel.create(data)

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const { query, fields, pagination } = getFindParams(request)

    const reviews = (await ReviewModel.find(
      query,
      fields,
      pagination
    )) as Review[]
    const total = await ReviewModel.countDocuments(query)
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

function getFindParams(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit

  const query = { body: { $regex: new RegExp(search, 'i') } }
  const fields = ''
  const pagination = { skip, limit }

  return { query, fields, pagination }
}
