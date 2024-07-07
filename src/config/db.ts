'use server'

import mongoose from 'mongoose'

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || '')
    console.log('DB connected')
    return true
  } catch (error) {
    console.log(error)
  }
}
