import { NextResponse } from 'next/server';
import { connectDB } from '@/configs';
import { deleteFiles, uploadFiles } from '@/helpers';
import { Note } from '@/types';
import { NoteModel } from '../model';


type Params = {
  note: string
}

export async function GET(request: Request, context: { params: Params }) {
  try {
    await connectDB()
    const id = context.params.note
    const note = (await NoteModel.findByIdAndUpdate(
      id,
     // { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )) as Note

    if (!note) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(note)
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

    const id = context.params.note

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

    const updatedNote = {
      text: data.get('text'),
      tags: data.get('tags'),
      published: data.get('published'),
      imageUrls,
    }

    const note = await NoteModel.findByIdAndUpdate(id, updatedNote, {
      new: true,
    })

    if (!note) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(note)
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
    const id = context.params.note
    const note = (await NoteModel.findByIdAndDelete(id)) as Note

    if (!note) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await deleteFiles(note.imageUrls)

    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}