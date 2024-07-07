'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'

export type Product = {
  id: string
  title: string
  imageUrls: string[]
  createdAt: string
  updatedAt: string
}

const schema = new Schema(
  {
    title: { type: String, require: true },
    imageUrls: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        return ret
      },
      versionKey: false,
    },
  }
)

export const ProductModel =
  mongoose.models.Product || model<Product>('Product', schema)
