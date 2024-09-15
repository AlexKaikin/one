'use server'

import { Schema, SchemaTypes, model, models } from 'mongoose'
import { schemaConfig } from '@/configs'
import { Message } from '@/types'

const schema = new Schema(
  {
    text: { type: String, default: '' },
    sender: { type: SchemaTypes.ObjectId, ref: 'User' },
    chat: { type: SchemaTypes.ObjectId, ref: 'Chat' },
    read: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
  },
  schemaConfig
)

export const MessageModel = models.Message || model<Message>('Message', schema)
