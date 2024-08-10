import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { UserService } from './service'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const user = await UserService.create(request)

    if (user) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'User registrated' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error occured while registering the user' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { users, total } = await UserService.getAll(request)
    const response = NextResponse.json(users)
    
    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
