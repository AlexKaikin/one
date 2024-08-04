import { NextResponse } from 'next/server';
import { connectDB } from '@/configs';
import { CommentService } from '../services';


type Params = {
  comment: string
}

export async function GET(request: Request, context: { params: Params }) {
  try {
    await connectDB()

    const id = context.params.comment
    const comment = await CommentService.getOne(id, request)
   
    if (!comment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(comment)
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

    const id = context.params.comment
    const comment = await CommentService.update(id, request)

    if (!comment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(comment)
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
    const id = context.params.comment
    const comment = await CommentService.remove(id)

    if (!comment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}