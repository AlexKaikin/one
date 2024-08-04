import { ModerationStatuses } from '@/entities'
import { CreateReview, Review } from '@/types'
import { ProductModel } from '../products/model'
import { ReviewModel } from './model'

export const ReviewService = { create, getAll, getOne, update, remove }

async function create(data: CreateReview) {
  return await ReviewModel.create(data)
}

async function getAll(request: Request) {
  const { query, fields, pagination } = getFindParams(request)

  const reviews = (await ReviewModel.find(query, fields, pagination).populate(
    getPopulate(request)
  )) as Review[]

  const total = await ReviewModel.countDocuments(query)

  return { reviews, total }
}

async function getOne(id: string, request: Request) {
  return await ReviewModel.findById(id).populate(getPopulate(request))
}

async function update(id: string, request: Request) {
  const data = await request.json()

  const review = await ReviewModel.findByIdAndUpdate(id, data, {
    new: true,
  }).populate('user product')

  if (!review) return null

  const reviewsByProduct = await ReviewModel.find({
    $and: [
      { product: review.product },
      { status: ModerationStatuses.approved },
    ],
  })

  await ProductModel.findByIdAndUpdate(
    review.product,
    {
      rating: getRating(reviewsByProduct),
      ratingCount: getRatingCount(reviewsByProduct),
    },
    { new: true }
  )

  return review
}

async function remove(id: string) {
  return await ReviewModel.findByIdAndDelete(id)
}

function getFindParams(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const product = searchParams.get('product')

  const sort = searchParams.get('_sort') || 'createdAt'
  const order = searchParams.get('_order') || 'desc'
  const sortParams = { [sort]: order }

  const user = searchParams.get('user')

  const query: any = { body: { $regex: new RegExp(search, 'i') } }

  if (user) query.user = user
  if (product) {
    query.product = product
    query.status = ModerationStatuses.approved
  }

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }

  return { query, fields, pagination }
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
