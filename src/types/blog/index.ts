import { MODERATION_STATUSES } from '@/constants'
import { User } from '../account'

export type Post = {
  id: string
  title: string
  imageUrls: string[]
  category: string
  viewsCount: number
  text: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

export type Comment = {
  id: string
  text: string
  status: MODERATION_STATUSES
  post: Post
  user: User
  createdAt: string
  updatedAt: string
}

export type CreateComment = Omit<
  Comment,
  'id' | 'post' | 'user' | 'createdAt' | 'updatedAt'
> & {
  post: string
  user: string
}
