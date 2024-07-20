'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/config'
import { ReviewStatuses } from '@/entities'
import { Product } from '../products/model'
import { User } from '../users/model'

export type Review = {
  id: string
  body: string
  rating: number
  status: ReviewStatuses
  user: User
  product: Product
  createdAt: string
  updatedAt: string
}

export type CreateReview = Omit<
  Review,
  'id' | 'status' | 'createdAt' | 'updatedAt' | 'product' | 'user'
> & { product: string; user: string }

const schema = new Schema(
  {
    body: { type: String, require: true },
    rating: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(ReviewStatuses),
      default: ReviewStatuses.moderation,
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
