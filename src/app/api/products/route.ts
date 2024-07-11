'use server'

import { NextResponse } from 'next/server'
import { connectDB } from '@/config/db'
import { uploadFiles } from '@/helpers'
import { Product, ProductModel } from '../../../app/api/products/model'

export async function POST(request: Request) {
  try {
    await connectDB()

    const data = await request.formData()
    const files = data.getAll('files[]') as File[]
    const response = await uploadFiles(files)
    const imageUrls = response.map(
      img => `/upload/${img?.display_name}.${img?.format}`
    )
    const title = data.get('title')
    const titleRu = data.get('translations[ru][title]')
    const translations = { ru: { title: titleRu } }
    const newProduct = { title, imageUrls, translations } as Product

    const product = await ProductModel.create(newProduct)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const { query, fields, pagination } = getFindParams(request)

    const products = (await ProductModel.find(
      query,
      fields,
      pagination
    )) as Product[]
    const total = await ProductModel.countDocuments(query)
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

function getFindParams(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit

  const query = { title: { $regex: new RegExp(search, 'i') } }
  const fields = ''
  const pagination = { skip, limit }

  return { query, fields, pagination }
}
