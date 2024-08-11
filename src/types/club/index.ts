import { User } from '../account'

export type Note = {
  id: string
  imageUrls: string[]
  text: string
  tags: string[]
  published: boolean
  user: User
  createdAt: string
  updatedAt: string
}
