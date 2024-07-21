import { NextResponse } from 'next/server'
import { connectDB } from '@/config/db'
import { ReviewStatuses } from '@/entities'
import { ProductModel } from '../../products/model'
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
    const review = await ReviewModel.findByIdAndUpdate(id, data, { new: true })

    if (!review) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const reviewsByProduct = await ReviewModel.find({
      $and: [{ product: review.product }, { status: ReviewStatuses.approved }],
    })

    const res = await ProductModel.findByIdAndUpdate(
      review.product,
      {
        rating: getRating(reviewsByProduct),
        ratingCount: getRatingCount(reviewsByProduct),
      },
      { new: true }
    )

    console.log('++', res)

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

function getRating(reviewsByProduct: Review[]) {
  if (reviewsByProduct.length) {
    const rewiewArr = reviewsByProduct.map(item => item.rating)
    const rewiewArrNeed = rewiewArr.filter(item => item !== 0)
    const ratingSum = rewiewArrNeed.reduce((a, b) => a + b)

    return Math.ceil(ratingSum / rewiewArrNeed.length)
  } else {
    return 0
  }
}

function getRatingCount(reviewsByProduct: Review[]) {
  const ratingsByProduct = reviewsByProduct.map(item => item.rating)
  const rewiewArrNeed = ratingsByProduct.filter(item => item !== 0)

  return rewiewArrNeed.length
}
