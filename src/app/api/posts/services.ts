import { uploadFiles } from '@/helpers'
import { Product } from '@/types'
import { PostModel } from './model'

export const PostService = {
  create: async (request: Request) => {
    const data = await request.formData()
    const files = data.getAll('files[]') as File[]
    const response = await uploadFiles(files)
    const imageUrls = response.map(
      img => `/upload/${img?.display_name}.${img?.format}`
    )
    const newPost = {
      title: data.get('title'),
      category: data.get('category'),
      text: data.get('text'),
      published: data.get('published'),
      translations: {
        ru: {
          title: data.get('translations[ru][title]'),
          text: data.get('translations[ru][text]'),
        },
      },
      imageUrls,
    }

    return await PostModel.create(newPost)
  },
  getAll: async (request: Request) => {
    const { query, fields, pagination } = await getFindParams(request)

    const posts = (await PostModel.find(query, fields, pagination)) as Product[]
    const total = await PostModel.countDocuments(query)
    return { posts, total }
  },
}

async function getFindParams(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const sort = searchParams.get('_sort') || 'createdAt'
  const order = searchParams.get('_order') || 'desc'
  const sortParams = { [sort]: order }
  const category = searchParams.get('category')
  const published = searchParams.get('published')

  const query: any = { title: { $regex: new RegExp(search, 'i') } }

  if (!published) query.published = true
  if (category) query.category = new RegExp(category, 'i')

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }

  return { query, fields, pagination }
}
