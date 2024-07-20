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

// function getFindParams(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const search = searchParams.get('search') || ''
//   const limit = Number(searchParams.get('limit') || 10)
//   const skip = (Number(searchParams.get('page') || 1) - 1) * limit

//   const query = { body: { $regex: new RegExp(search, 'i') } }
//   const fields = ''
//   const pagination = { skip, limit }

//   return { query, fields, pagination }
// }

function getPopulate(request: Request) {
  const { searchParams } = new URL(request.url)
  return searchParams.get('populate') || ''
}
