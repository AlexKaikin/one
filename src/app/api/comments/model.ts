'use server'

import { Schema, SchemaTypes, model, models } from 'mongoose'
import { schemaConfig } from '@/configs'
import { MODERATION_STATUSES } from '@/constants'
import { Comment } from '@/types'

const schema = new Schema(
  {
    text: { type: String, require: true },
    status: {
      type: String,
      enum: Object.values(MODERATION_STATUSES),
      default: MODERATION_STATUSES.MODERATION,
    },
    user: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    post: { type: SchemaTypes.ObjectId, ref: 'Post', required: true },
  },
  schemaConfig
)

export const CommentModel = models.Comment || model<Comment>('Comment', schema)
