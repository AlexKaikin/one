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
  published: string
  post: Post
  user: User
  createdAt: string
  updatedAt: string
}

export type CreateComment = Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>
