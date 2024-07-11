import { NextResponse } from 'next/server'
import { connectDB } from '@/config/db'
import { deleteFiles, toObject, uploadFiles } from '@/helpers'
import { Product, ProductModel } from '../model'

type Params = {
  product: string
}

export async function GET(request: Request, context: { params: Params }) {
  try {
    await connectDB()
    const id = context.params.product
    const product = (await ProductModel.findById(id)) as Product

    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(product)
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

    const id = context.params.product

    const data = await request.formData()

    const files = data.getAll('files[]') as File[]
    const response = await uploadFiles(files)
    const newImageUrls = response.map(
      img => `/upload/${img?.display_name}.${img?.format}`
    )
    const destroyImageUrls =
      (data.getAll('destroyImageUrls[]') as string[]) || []

    if (destroyImageUrls.length) await deleteFiles(destroyImageUrls)

    const title = data.get('title')
    const titleRu = data.get('translations[ru][title]')
    const translations = { ru: { title: titleRu } }
    const imageUrls = data.getAll('imageUrls[]')
      ? [...data.getAll('imageUrls[]'), ...newImageUrls]
      : [...newImageUrls]

    const updatedProduct = { title, imageUrls, translations }

    const product = await ProductModel.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    })

    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(product)
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
    const id = context.params.product
    const product = (await ProductModel.findByIdAndDelete(id)) as Product

    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await deleteFiles(product.imageUrls)

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// function parseDeepFormData(formData) {
//     let result = {};

//     for (let pair of formData.entries()) {
//         let keys = pair[0].split('[');
//         let value = pair[1];
//         let current = result;

//         for (let i = 0; i < keys.length; i++) {
//             let key = keys[i].replace(']', '');

//             if (i === keys.length - 1) {
//                 current[key] = value;
//             } else {
//                 current[key] = current[key] || {};
//                 current = current[key];
//             }
//         }
//     }

//     return result;
// }
