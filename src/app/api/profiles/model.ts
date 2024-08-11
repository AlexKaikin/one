'use server'

import { Schema, SchemaTypes, model, models } from 'mongoose'
import { schemaConfig } from '@/configs'
import { Profile } from '@/types'

const schema = new Schema(
  {
    location: { type: String, default: '' },
    about: { type: String, default: '' },
    interests: [{ type: String }],
    followers: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    following: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
  },
  schemaConfig
)

export const ProfileModel = models.Profile || model<Profile>('Profile', schema)
