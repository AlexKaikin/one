import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { ProfileService } from './service'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const profile = await ProfileService.create(request)

    return NextResponse.json(profile, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { profiles, total } = await ProfileService.getAll(request)
    const response = NextResponse.json(profiles)

    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
