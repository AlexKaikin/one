'use server'

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
})

export async function uploadFile(
  file: File
): Promise<UploadApiResponse | undefined> {
  const buffer = await file.arrayBuffer()
  const bytes = Buffer.from(buffer)

  return new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: 'auto', folder: 'upload' },
        async (err, result) => {
          if (err) reject(err.message)

          resolve(result)
        }
      )
      .end(bytes)
  })
}

export async function uploadFiles(files: File[]) {
  return await Promise.all(files.map(file => uploadFile(file)))
}

export async function deleteFile(url: string) {
  return new Promise(async (resolve, reject) => {
    const regex = /\/upload\/([^.]+)\./ // input '/upload/asfdhajs.png' output 'asfdhajs'
    const match = url.match(regex) || ''

    try {
      const result = await cloudinary.uploader.destroy(`upload/${match[1]}`)

      return resolve(result)
    } catch (error: any) {
      reject(new Error(error.message))
    }
  })
}

export async function deleteFiles(urls: string[]) {
  return await Promise.all(urls.map(url => deleteFile(url)))
}
