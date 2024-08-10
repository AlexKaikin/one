'use server'

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { ProductService } from './services'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const product = await ProductService.create(request)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { products, total } = await ProductService.getAll(request)
    const response = NextResponse.json(products)
    response.headers.append('X-Total-Count', String(total))

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
