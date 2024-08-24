'use server'

import { Schema, SchemaTypes, model, models } from 'mongoose'
import { schemaConfig } from '@/configs'
import { PROFILE_TYPES } from '@/constants'
import { Profile } from '@/types'

const schema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(PROFILE_TYPES),
      default: PROFILE_TYPES.USER,
      require: true,
    },
    companyName: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    location: { type: String, default: '' },
    about: { type: String, default: '' },
    interests: { type: String, default: '' },
    followers: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    following: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    user: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  },
  schemaConfig
)

export const ProfileModel = models.Profile || model<Profile>('Profile', schema)
