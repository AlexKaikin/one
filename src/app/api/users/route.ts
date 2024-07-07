import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { connectDB } from '@/config/db'
import { User, UserModel } from '../users/model'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    await connectDB()

    const exists = await UserModel.findOne({ email: data.email })

    if (exists) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 500 }
      )
    }

    const hashPassword = await bcrypt.hash(data.password, 3)
    await UserModel.create({ ...data, password: hashPassword })

    return NextResponse.json({ message: 'User registrated' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error occured while registering the user' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()

    const users = (await UserModel.find()) as User[]

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
