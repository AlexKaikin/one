import { NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { User, UserModel } from '../model'

type Params = {
  user: string
}

export async function GET(_: Request, context: { params: Params }) {
  try {
    await connectDB()
    const id = context.params.user
    const user = (await UserModel.findById(id)) as User

    if (!user) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request, context: { params: Params }) {
  try {
    await connectDB()
    const data = await request.formData()
    const id = context.params.user

    const updatedUser = {
      email: data.get('email'),
      lastName: data.get('lastName'),
      firstName: data.get('firstName'),
    }

    const user = await UserModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    })

    if (!user) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE(_: Request, context: { params: Params }) {
  try {
    await connectDB()
    const id = context.params.user
    const user = (await UserModel.findByIdAndDelete(id)) as User

    if (!user) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
