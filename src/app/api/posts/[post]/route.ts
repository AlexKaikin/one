import { NextResponse } from 'next/server';
import { connectDB } from '@/configs';
import { deleteFiles, uploadFiles } from '@/helpers';
import { Post } from '@/types';
import { PostModel } from '../model';


type Params = {
  post: string
}

export async function GET(request: Request, context: { params: Params }) {
  try {
    await connectDB()
    const id = context.params.post
    const post = (await PostModel.findByIdAndUpdate(
      id,
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )) as Post

    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(post)
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

    const id = context.params.post

    const data = await request.formData()

    const files = data.getAll('files[]') as File[]
    const response = await uploadFiles(files)
    const newImageUrls = response.map(
      img => `/upload/${img?.display_name}.${img?.format}`
    )
    const destroyImageUrls =
      (data.getAll('destroyImageUrls[]') as string[]) || []

    if (destroyImageUrls.length) await deleteFiles(destroyImageUrls)

    const imageUrls = data.getAll('imageUrls[]')
      ? [...data.getAll('imageUrls[]'), ...newImageUrls]
      : [...newImageUrls]

    const updatedPost = {
      title: data.get('title'),
      category: data.get('category'),
      text: data.get('text'),
      published: data.get('published'),
      translations: {
        ru: {
          title: data.get('translations[ru][title]'),
          text: data.get('translations[ru][text]'),
        },
      },
      imageUrls,
    }

    const post = await PostModel.findByIdAndUpdate(id, updatedPost, {
      new: true,
    })

    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(post)
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
    const id = context.params.post
    const post = (await PostModel.findByIdAndDelete(id)) as Post

    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await deleteFiles(post.imageUrls)

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}