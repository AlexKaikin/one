import { NextResponse } from 'next/server'
import { connectDB } from '@/configs'
import { Order, OrderModel } from '../model'

type Params = {
  order: string
}

export async function GET(request: Request, context: { params: Params }) {
  try {
    await connectDB()
    const id = context.params.order
    const order = (await OrderModel.findById(id)) as Order

    if (!order) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(order)
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

    const id = context.params.order
    const data = await request.json()
    const order = await OrderModel.findByIdAndUpdate(id, data, { new: true })

    if (!order) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(order)
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
    const id = context.params.order
    const order = (await OrderModel.findByIdAndDelete(id)) as Order

    if (!order) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
