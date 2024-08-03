'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { schemaConfig } from '@/configs'
import { Roles, UserStatuses } from '@/entities'
import { User } from '@/types'

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
    status: {
      type: String,
      enum: Object.values(UserStatuses),
      default: UserStatuses.active,
      require: true,
    },
  },
  schemaConfig
)

export const UserModel = mongoose.models.User || model<User>('User', schema)
