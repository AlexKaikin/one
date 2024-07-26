'use server'

import { NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { OrderService } from './services'

export async function POST(request: Request) {
  try {
    await connectDB()

    const product = await OrderService.create(request)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const { orders, total } = await OrderService.getAll(request)
    const response = NextResponse.json(orders)
    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
