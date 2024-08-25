import { NextRequest } from 'next/server'
import { uploadFiles } from '@/helpers'
import { Note, Product } from '@/types'
import { NoteModel } from './model'

export const NoteService = {
  create: async (request: NextRequest) => {
    const data = await request.formData()
    const files = data.getAll('files[]') as File[]
    const response = await uploadFiles(files)
    const imageUrls = response.map(
      img => `/upload/${img?.display_name}.${img?.format}`
    )

    const newNote = {
      text: data.get('text'),
      profile: data.get('profile'),
      published: data.get('published'),
      tags: data.get('tags'),
      imageUrls,
    }

    return await NoteModel.create(newNote)
  },
  getAll: async (request: NextRequest) => {
    const { query, fields, pagination } = await getFindParams(request)

    const notes = (await NoteModel.find(query, fields, pagination).populate({
      path: 'profile',
      populate: {
        path: 'user',
      },
    })) as Note[]
    const total = await NoteModel.countDocuments(query)
    return { notes, total }
  },
}

async function getFindParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const sort = searchParams.get('_sort') || 'createdAt'
  const order = searchParams.get('_order') || 'desc'
  const sortParams = { [sort]: order }
  const profile = searchParams.get('profile')

  const query: any = {}

  if (profile) query.profile = profile

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }

  return { query, fields, pagination }
}

function getPopulate(request: Request | undefined) {
  if (!request) return ''

  const { searchParams } = new URL(request.url)

  return searchParams.get('populate') || ''
}
