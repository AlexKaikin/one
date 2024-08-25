import { Profile } from '../account'

export type Note = {
  id: string
  imageUrls: string[]
  text: string
  tags: string
  published: boolean
  profile: Profile
  views: string[]
  createdAt: string
  updatedAt: string
}

export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
