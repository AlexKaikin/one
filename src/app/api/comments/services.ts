import { ModerationStatuses } from '@/entities';
import { CreateComment, Review } from '@/types';
import { CommentModel } from './model';


export const CommentService = { create, getAll, getOne, update, remove }

async function create(data: CreateComment) {
  return await CommentModel.create(data)
}

async function getAll(request: Request) {
  const { query, fields, pagination } = getFindParams(request)

  const comments = (await CommentModel.find(query, fields, pagination).populate(
    getPopulate(request)
  )) as Review[]

  const total = await CommentModel.countDocuments(query)

  return { comments, total }
}

async function getOne(id: string, request: Request) {
  return await CommentModel.findById(id).populate(getPopulate(request))
}

async function update(id: string, request: Request) {
  const data = await request.json()

  const comment = await CommentModel.findByIdAndUpdate(id, data, {
    new: true,
  }).populate('user post')

  return comment
}

async function remove(id: string) {
  return await CommentModel.findByIdAndDelete(id)
}

function getFindParams(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const post = searchParams.get('post')

  const sort = searchParams.get('_sort') || 'createdAt'
  const order = searchParams.get('_order') || 'desc'
  const sortParams = { [sort]: order }

  const user = searchParams.get('user')

  const query: any = { text: { $regex: new RegExp(search, 'i') } }

  if (user) query.user = user
  if (post) {
    query.post = post
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