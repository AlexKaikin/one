'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/configs'
import { Order } from '@/types'

const cartItemsSchema = {
  id: { type: String, require: true },
  title: { type: String, require: true },
  imageUrls: [{ type: String }],
  price: { type: Number, require: true },
  cost: { type: Number, require: true },
  quantity: { type: Number, require: true },
  inStock: { type: Number, require: true },
  category: { type: String, require: true },
}

const schema = new Schema(
  {
    name: { type: String, require: true },
    surname: { type: String, require: true },
    middleName: { type: String, require: true },
    region: { type: String, require: true },
    city: { type: String, require: true },
    street: { type: String, require: true },
    home: { type: String, require: true },
    apartment: { type: String },
    index: { type: Number, require: true },
    cartItems: [cartItemsSchema],
    totalCost: { type: Number, require: true },
    status: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  schemaConfig
)

export const OrderModel = mongoose.models.Order || model<Order>('Order', schema)
