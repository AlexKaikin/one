import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/configs';
import { ProfileService } from '../service';


type Params = {
  profile: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    await connectDB()

    const id = context.params.profile
    const profile = await ProfileService.getOne(id, request)
    
    if (!profile) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(profile)
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

    const id = context.params.profile
    const profile = await ProfileService.update(id, request)

    if (!profile) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(profile)
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
    const id = context.params.profile
    const profile = await ProfileService.getOne(id)

    if (!profile) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}