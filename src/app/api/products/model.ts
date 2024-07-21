'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/config'
import { Measurements } from '@/entities'

export type Product = {
  id: string
  title: string
  description: string
  price: number
  inStock: number
  volume: string
  volumeMeasurement: Measurements
  ratingCount: number
  viewsCount: number
  rating: number
  imageUrls: string[]
  property: { key: string; value: string }[]
  category: string
  tags: string[]
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
    category: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    inStock: { type: Number, require: true },
    volume: { type: String, require: true },
    volumeMeasurement: { type: String, require: true },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    imageUrls: [{ type: String }],
    tags: [{ type: String }],
    property: [propertySchema],
    published: { type: Boolean, default: false },
    translations: translationSchema,
  },
  schemaConfig
)

export const ProductModel =
  mongoose.models.Product || model<Product>('Product', schema)
