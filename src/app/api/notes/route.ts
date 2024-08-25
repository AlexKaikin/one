'use server';

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/configs';
import { NoteService } from './services';


export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const note = await NoteService.create(request)

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { notes, total } = await NoteService.getAll(request)
    const response = NextResponse.json(notes)
    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}