import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/configs';
import { ChatService } from '../../services';


type Params = {
  user: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    await connectDB()
    const userId = context.params.user
    const chat = await ChatService.getOneOrCreate(request, userId)

    return NextResponse.json(chat)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}