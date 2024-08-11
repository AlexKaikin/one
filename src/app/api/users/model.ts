'use server'

import { Schema, SchemaTypes, model, models } from 'mongoose'
import { schemaConfig } from '@/configs'
import { ROLES, USER_STATUSES } from '@/constants'
import { User } from '@/types'

const schema = new Schema(
  {
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    email: { type: String, require: true },
    avatarUrl: { type: String, default: '' },
    password: { type: String, require: true },
    profile: { type: SchemaTypes.ObjectId, ref: 'Profile' },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
      require: true,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUSES),
      default: USER_STATUSES.ACTIVE,
      require: true,
    },
  },
  schemaConfig
)

export const UserModel = models.User || model<User>('User', schema)
