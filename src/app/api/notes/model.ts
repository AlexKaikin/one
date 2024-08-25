'use server'

import { Schema, SchemaTypes, model, models } from 'mongoose'
import { schemaConfig } from '@/configs'
import { Note } from '@/types'

const schema = new Schema(
  {
    text: { type: String, require: true },
    imageUrls: [{ type: String }],
    published: { type: Boolean, default: true },
    tags: { type: String, default: '' },
    profile: { type: SchemaTypes.ObjectId, ref: 'Profile', required: true },
    views: [{ type: SchemaTypes.ObjectId, ref: 'Profile' }],
  },
  schemaConfig
)

export const NoteModel = models.Note || model<Note>('Note', schema)
