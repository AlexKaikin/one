import bcrypt from 'bcrypt'
import { NextRequest } from 'next/server'
import { deleteFiles, uploadFile, uploadFiles } from '@/helpers'
import { User } from '@/types'
import { UserModel } from './model'

export const UserService = {
  create: async (request: NextRequest) => {
    const data = await request.formData()

    const newUser = {
      email: data.get('email'),
      password: data.get('password'),
    }

    const exists = await UserModel.findOne({ email: newUser.email })

    if (exists) {
      return exists
    }

    const password = data.get('password') as string
    const hashPassword = await bcrypt.hash(password, 3)
    await UserModel.create({ ...newUser, password: hashPassword })
  },
  getAll: async (request: NextRequest) => {
    const { query, fields, pagination } = await getFindParams(request)

    const users = (await UserModel.find(query, fields, pagination)) as User[]
    const total = await UserModel.countDocuments(query)
    return { users, total }
  },
  getOne: async (id: string) => {
    const user = (await UserModel.findById(id)) as User

    return user
  },
  update: async (id: string, request: NextRequest) => {
    const data = await request.formData()

    const destroyImageUrls =
      (data.getAll('destroyImageUrls[]') as string[]) || []

    if (destroyImageUrls.length) await deleteFiles(destroyImageUrls)

    const files = data.getAll('files[]') as File[]
    const response = await uploadFiles(files)
    const avatarUrls = response.map(
      img => `/upload/${img?.display_name}.${img?.format}`
    )

    const email = data.get('email')
    const lastName = data.get('lastName')
    const firstName = data.get('firstName')
    const status = data.get('status')
    const role = data.get('role')
    const location = data.get('location')
    const about = data.get('about')
    const interests = data.getAll('interests[]')

    const updatedUser: any = {}

    if (email) updatedUser.email = email
    if (lastName) updatedUser.lastName = lastName
    if (firstName) updatedUser.firstName = firstName
    if (status) updatedUser.status = status
    if (role) updatedUser.role = role
    if (location) updatedUser.location = location
    if (about) updatedUser.about = about
    if (interests) updatedUser.interests = interests
    if (avatarUrls.length) updatedUser.avatarUrl = avatarUrls[0]
    if (destroyImageUrls.length && !files.length) {
      updatedUser.avatarUrl = null
    }

    const user = await UserModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    })

    return user
  },
  delete: async (id: string) => {
    const user = (await UserModel.findByIdAndDelete(id)) as User

    return user
  },
}

async function getFindParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const sort = searchParams.get('_sort') || 'createdAt'
  const order = searchParams.get('_order') || 'desc'
  const sortParams = { [sort]: order }

  const query: any = {}

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }

  return { query, fields, pagination }
}
