'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/config'
import { Roles } from '@/entities'

export type User = {
  id: string
  lastName: string
  firstName: string
  avatarUrl: string
  email: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
}

const schema = new Schema(
  {
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    email: { type: String, require: true },
    avatarUrl: { type: String },
    password: { type: String, require: true },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.user,
      require: true,
    },
  },
  schemaConfig
)

export const UserModel = mongoose.models.User || model<User>('User', schema)
