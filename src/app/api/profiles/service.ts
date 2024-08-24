import bcrypt from 'bcrypt'
import { NextRequest } from 'next/server'
import { ROLES } from '@/constants'
import { deleteFiles, ensureSpaceAfterComma, uploadFiles } from '@/helpers'
import { Profile, User } from '@/types'
import { UserModel } from '../users/model'
import { ProfileModel } from './model'

export const ProfileService = {
  create: async (request: NextRequest) => {
    const data = await request.formData()
    const files = data.getAll('files[]') as File[]
    const response = await uploadFiles(files)
    const avatarUrls = response.map(
      img => `/upload/${img?.display_name}.${img?.format}`
    )

    const companyName = data.get('companyName')
    const location = data.get('location')
    const about = data.get('about')
    const interests = data.get('interests')
    const type = data.get('type')

    const newProfile: any = { companyName, type, user: data.get('user[id]') }

    if (avatarUrls.length) newProfile.avatarUrl = avatarUrls[0]
    if (location) newProfile.location = location
    if (about) newProfile.about = about
    if (interests)
      newProfile.interests = ensureSpaceAfterComma(interests as string)

    return await ProfileModel.create({ ...newProfile })
  },
  getAll: async (request: NextRequest) => {
    const { query, fields, pagination } = await getFindParams(request)
    const profiles = (await ProfileModel.find(
      query,
      fields,
      pagination
    ).populate(getPopulate(request))) as Profile[]
    const total = await ProfileModel.countDocuments(query)

    return { profiles, total }
  },
  getOne: async (id: string, request?: NextRequest) => {
    const profile = (await ProfileModel.findById(id).populate(
      getPopulate(request)
    )) as Profile

    return profile
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

    const companyName = data.get('companyName')
    const location = data.get('location')
    const about = data.get('about')
    const interests = data.get('interests')

    const updateProfile: any = { companyName }

    if (avatarUrls.length) updateProfile.avatarUrl = avatarUrls[0]
    if (location) updateProfile.location = location
    if (about) updateProfile.about = about
    if (interests)
      updateProfile.interests = ensureSpaceAfterComma(interests as string)

    if (destroyImageUrls.length && !files.length) {
      updateProfile.avatarUrl = null
    }

    const updatedUser: any = {}
    const lastName = data.get('user[lastName]')
    const firstName = data.get('user[firstName]')
    const userId = data.get('user[id]')

    if (lastName) updatedUser.lastName = lastName
    if (firstName) updatedUser.firstName = firstName

    await UserModel.findByIdAndUpdate(userId, updatedUser)

    return await ProfileModel.findByIdAndUpdate(id, updateProfile, {
      new: true,
    }).populate('user')
  },
  delete: async (id: string) => {
    return (await ProfileModel.findByIdAndDelete(id)) as Profile
  },
}

async function getFindParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const sort = searchParams.get('_sort') || 'createdAt'
  const order = searchParams.get('_order') || 'desc'
  const sortParams = { [sort]: order }
  const id_nin = searchParams.get('id_nin')
  const type = searchParams.get('type')

  const query: any = { _id: { $nin: id_nin?.split(' ') || [] } }

  if (type) {
    query.type = type
  }

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }

  return { query, fields, pagination }
}

function getPopulate(request: Request | undefined) {
  if (!request) return ''

  const { searchParams } = new URL(request.url)

  return searchParams.get('populate') || ''
}
