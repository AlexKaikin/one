import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/configs';
import { User } from '@/types';
import { UserModel } from '../model';
import { UserService } from '../service';


type Params = {
  user: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    await connectDB()

    const id = context.params.user
    const user = await UserService.getOne(id, request)
    
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

export async function PATCH(request: NextRequest, context: { params: Params }) {
  try {
    await connectDB()

    const id = context.params.user
    const user = await UserService.update(id, request)

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
    const user = await UserService.getOne(id)

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