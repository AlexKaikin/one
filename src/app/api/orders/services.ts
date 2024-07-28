import { Order } from '@/types'
import { OrderModel } from './model'

export const OrderService = {
  create: async (request: Request) => {
    const data = await request.json()

    return await OrderModel.create(data)
  },
  getAll: async (request: Request) => {
    const { query, fields, pagination } = await getFindParams(request)
    const orders = (await OrderModel.find(query, fields, pagination)) as Order[]
    const total = await OrderModel.countDocuments(query)

    return { orders, total }
  },
}

async function getFindParams(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const sort = searchParams.get('_sort') || 'createdAt'
  const order = searchParams.get('_order') || 'desc'
  const sortParams = { [sort]: order }
  const user = searchParams.get('user')
  const query: any = {}

  if (user) query.user = user

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }

  return { query, fields, pagination }
}
