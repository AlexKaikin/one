'use server'

import { Schema, SchemaTypes, model, models } from 'mongoose'
import { schemaConfig } from '@/configs'
import { Chat } from '@/types'

const schema = new Schema(
  {
    users: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    lastMessage: { type: SchemaTypes.ObjectId, ref: 'Message' },
  },
  schemaConfig
)

export const ChatModel = models.Chat || model<Chat>('Chat', schema)
