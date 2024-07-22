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
    const newProduct = {
      title: data.get('title'),
      category: data.get('category'),
      description: data.get('description'),
      price: data.get('price'),
      inStock: data.get('inStock'),
      volume: data.get('volume'),
      volumeMeasurement: data.get('volumeMeasurement'),
      published: data.get('published'),
      characteristics: {
        manufacturer: data.get('characteristics[manufacturer]'),
        country: data.get('characteristics[country]'),
        city: data.get('characteristics[city]'),
        year: data.get('characteristics[year]'),
      },
      translations: {
        ru: {
          title: data.get('translations[ru][title]'),
          description: data.get('translations[ru][description]'),
          manufacturer: data.get('translations[ru][manufacturer]'),
          country: data.get('translations[ru][country]'),
          city: data.get('translations[ru][city]'),
          year: data.get('translations[ru][year]'),
        },
      },
      imageUrls,
    }

    const product = await ProductModel.create(newProduct)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const { query, fields, pagination } = await getFindParams(request)

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

async function getFindParams(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (Number(searchParams.get('page') || 1) - 1) * limit
  const sort = searchParams.get('_sort') || 'createdAt'
  const order = searchParams.get('_order') || 'desc'
  const sortParams = { [sort]: order }
  const category = searchParams.get('category')
  const published = searchParams.get('published')

  const priceFrom = searchParams.get('price_gte')
  const priceTo = searchParams.get('price_lte')
  const ratings = searchParams.get('ratings')?.split(',')
  const manufacturer = searchParams.get('manufacturer') || ''

  const query: any = {
    title: { $regex: new RegExp(search, 'i') },
  }

  if (!published) query.published = true
  if (category) query.category = new RegExp(category, 'i')
  if (ratings) query.rating = { $in: ratings }
  if (manufacturer)
    query['characteristics.manufacturer'] = new RegExp(manufacturer, 'i')
  if (priceFrom)
    query.price
      ? (query.price.$gte = priceFrom)
      : (query.price = { $gte: priceFrom })
  if (priceTo)
    query.price
      ? (query.price.$lte = priceTo)
      : (query.price = { $lte: priceTo })

  const fields = ''
  const pagination = { skip, limit, sort: sortParams }

  return { query, fields, pagination }
}
