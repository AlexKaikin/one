'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/configs'
import { Post } from '@/types'

const translationSchema = {
  ru: {
    title: { type: String, default: '' },
    text: { type: String, default: '' },
  },
}

const schema = new Schema(
  {
    title: { type: String, require: true },
    text: { type: String, require: true },
    category: { type: String, require: true },
    ratingCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    imageUrls: [{ type: String }],
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    translations: translationSchema,
  },
  schemaConfig
)

export const PostModel = mongoose.models.Post || model<Post>('Post', schema)
