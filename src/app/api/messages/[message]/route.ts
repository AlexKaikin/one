import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/configs';
import { MessageService } from '../services';


type Params = {
  message: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    await connectDB()
    const id = context.params.message
    const message = await MessageService.getOne(id)

    if (!message) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(message)
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

    const id = context.params.message
    const message = await MessageService.update(id, request)

    if (!message) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(message)
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
    const id = context.params.message
    const message = await MessageService.remove(id)

    if (!message) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}