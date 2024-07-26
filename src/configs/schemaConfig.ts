import mongoose from 'mongoose'

export const schemaConfig = {
  timestamps: true,
  toJSON: {
    transform: (_: mongoose.Document, ret: Record<string, any>) => {
      ret.id = ret._id.toString()
      delete ret._id
      return ret
    },
    versionKey: false,
  },
}
