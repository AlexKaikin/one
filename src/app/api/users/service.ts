import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';
import { ROLES } from '@/constants';
import { deleteFiles, uploadFiles } from '@/helpers';
import { Profile, User } from '@/types';
import { ProfileModel } from '../profiles/model';
import { UserModel } from './model';


const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',')

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
    const profile = (await ProfileModel.create({})) as unknown as Profile & {
      _id: string
    }

    await UserModel.create({
      ...newUser,
      password: hashPassword,
      role: getRole(newUser.email as string),
      profile: profile._id,
    })
  },
  getAll: async (request: NextRequest) => {
    const { query, fields, pagination } = await getFindParams(request)
    const users = (await UserModel.find(query, fields, pagination)) as User[]
    const total = await UserModel.countDocuments(query)

    return { users, total }
  },
  getOne: async (id: string, request?: NextRequest) => {
    const user = (await UserModel.findById(id).populate(
      getPopulate(request)
    )) as User

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
    const location = data.get('profile[location]')
    const about = data.get('profile[about]')
    const interests = data.get('profile[interests]')
    const profileId = data.get('profile[id]')

    const updatedUser: any = {}
    const updateProfile: any = {}

    if (email) updatedUser.email = email
    if (lastName) updatedUser.lastName = lastName
    if (firstName) updatedUser.firstName = firstName
    if (status) updatedUser.status = status
    if (role) updatedUser.role = role
    if (avatarUrls.length) updatedUser.avatarUrl = avatarUrls[0]

    if (location) updateProfile.location = location
    if (about) updateProfile.about = about
    if (interests) updateProfile.interests = (interests as string).split(',').map(item => item.trim())

    if (destroyImageUrls.length && !files.length) {
      updatedUser.avatarUrl = null
    }

    await ProfileModel.findByIdAndUpdate(profileId, updateProfile)
    const user = await UserModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    }).populate('profile')

    return user
  },
  delete: async (id: string) => {
    const user = (await UserModel.findByIdAndDelete(id)) as User
    await ProfileModel.findByIdAndDelete(user.profile as unknown as string)

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

const getRole = (email: string) => {
  return adminEmails?.includes(email) ? ROLES.ADMIN : ROLES.USER
}

function getPopulate(request: Request | undefined) {
  if (!request) return ''

  const { searchParams } = new URL(request.url)

  return searchParams.get('populate') || ''
}
