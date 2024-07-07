'use server'

import 'mongoose'
import mongoose, { Schema, model } from 'mongoose'

export type User = {
  id: string
  lastName: string
  firstName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

const schema = new Schema(
  {
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
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

export const UserModel = mongoose.models.User || model<User>('User', schema)
