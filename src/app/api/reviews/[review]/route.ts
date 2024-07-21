import { NextResponse } from 'next/server'
import { connectDB } from '@/config/db'
import { Review, ReviewModel } from '../model'

type Params = {
  review: string
}

export async function GET(request: Request, context: { params: Params }) {
  try {
    await connectDB()

    const id = context.params.review
    const review = await ReviewModel.findById(id).populate(getPopulate(request))

    if (!review) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request, context: { params: Params }) {
  try {
    await connectDB()

    const id = context.params.review

    const data = await request.json()

    const review = await ReviewModel.findByIdAndUpdate(id, data, {
      new: true,
    })

    if (!review) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE(_: Request, context: { params: Params }) {
  try {
    await connectDB()
    const id = context.params.review
    const review = (await ReviewModel.findByIdAndDelete(id)) as Review

    if (!review) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

function getPopulate(request: Request) {
  const { searchParams } = new URL(request.url)
  return searchParams.get('populate') || ''
}
