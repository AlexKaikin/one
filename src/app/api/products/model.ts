'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/configs'
import { Product } from '@/types'

const characteristicsSchema = {
  manufacturer: { type: String, default: '' },
  country: { type: String, default: '' },
  city: { type: String, default: '' },
  year: { type: Number, default: 0 },
}

const translationSchema = {
  ru: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    ...characteristicsSchema,
  },
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
    characteristics: characteristicsSchema,
    published: { type: Boolean, default: false },
    translations: translationSchema,
  },
  schemaConfig
)

export const ProductModel =
  mongoose.models.Product || model<Product>('Product', schema)
