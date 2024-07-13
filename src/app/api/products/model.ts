'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/config'

export type Product = {
  id: string
  title: string
  description: string
  price: number
  inStock: number
  volume: string
  imageUrls: string[]
  property: { key: string; value: string }[]
  category: string
  published: boolean
  translations: { ru: { title: string } }
  createdAt: string
  updatedAt: string
}

const translationSchema = {
  ru: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
}

const propertySchema = {
  key: { type: String, require: true },
  value: { type: String, require: true },
}

const schema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    inStock: { type: Number, require: true },
    volume: { type: String, require: true },
    imageUrls: [{ type: String }],
    property: [propertySchema],
    category: { type: String, require: true },
    published: { type: Boolean, default: false },
    translations: translationSchema,
  },
  schemaConfig
)

export const ProductModel =
  mongoose.models.Product || model<Product>('Product', schema)
