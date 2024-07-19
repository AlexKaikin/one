import { NextResponse } from 'next/server'
import { connectDB } from '@/config/db'
import { Review, ReviewModel } from '../../model'

type Params = {
  product: string
}

export async function GET(request: Request, context: { params: Params }) {
  try {
    await connectDB()
    const product = context.params.product
    const reviews = (await ReviewModel.find({ product }).populate('user')) as unknown as Review

    if (!reviews) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
