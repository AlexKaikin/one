'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/configs'
import { ModerationStatuses } from '@/entities'
import { Review } from '@/types'

const schema = new Schema(
  {
    body: { type: String, require: true },
    rating: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(ModerationStatuses),
      default: ModerationStatuses.moderation,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  schemaConfig
)

export const ReviewModel =
  mongoose.models.Review || model<Review>('Review', schema)
