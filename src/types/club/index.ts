import { Profile, User } from '../account'

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

export type Chat = {
  id: string
  users: User[]
  lastMessage: Message
  createdAt: string
  updatedAt: string
}

export type CreateChat = Omit<
  Chat,
  'id' | 'lastMessage' | 'createdAt' | 'updatedAt'
>

export type Message = {
  id: string
  text: string
  sender: User
  chat: Chat
  read: User[]
  createdAt: string
  updatedAt: string
}

export type CreateMessage = Omit<Message, 'id' | 'createdAt' | 'updatedAt'>
