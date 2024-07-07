'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Product } from '@/app/api/products/model'
import { ProductService } from '@/services'
import {
  Button,
  Form,
  FormFile,
  FormInput,
  Icon,
  IconButton,
  useNotify,
} from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './ProductForm.module.css'

const required_error = 'Required'
const MAX_SIZE_FILE = 1
const MAX_FILES = 10

const schema = z.object({
  id: z.string(),
  title: z.string({ required_error }).min(1, { message: required_error }),
  imageUrls: z.string().array(),
  destroyImageUrls: z.string().array().optional(),
  files: z
    .instanceof(typeof window === 'undefined' ? File : FileList)
    .optional(),
})

type Props = {
  defaultValues: Product
  onSubmit: (value: Product) => void
}

export function ProductForm({ defaultValues, onSubmit }: Props) {
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const { notify } = useNotify()
  const router = useRouter()
  const isUpdateMode = !!defaultValues.id.length
  const formMethods = useForm<
    Product & { files: FileList | null; destroyImageUrls: string[] }
  >({ defaultValues, resolver: zodResolver(schema) })
  const { formState, getValues, setValue, watch, reset } = formMethods
  const { isDirty } = formState

  const isFilesLimit =
    getValues('imageUrls').length + filePreviews.length >= MAX_FILES
  const filesLimit =
    MAX_FILES - (getValues('imageUrls').length + filePreviews.length)

  function toFileList(files: File[]) {
    const dataTransfer = new DataTransfer()
    files.forEach(file => dataTransfer.items.add(file))
    return dataTransfer.files
  }

  function removeFile(src: string, index: number) {
    if (getValues('imageUrls').includes(src)) {
      const value = getValues('destroyImageUrls')
        ? [...getValues('destroyImageUrls'), src]
        : [src]
      setValue('destroyImageUrls', value)
    }

    const files = Array.from(getValues('files') || [])
    files.splice(index, 1)
    const imageUrls = getValues('imageUrls').filter(value => value !== src)
    setFilePreviews(prevState => prevState.filter(file => file !== src))
    setValue('files', toFileList(files), { shouldDirty: true })
    setValue('imageUrls', imageUrls)
  }

  async function handleDeleteProduct() {
    await ProductService.delete(defaultValues.id)
    router.push('/admin/products')
    notify({ type: 'success', message: 'Completed successfully' })
    router.refresh()
  }

  const handleChangeFile = (files: FileList) => {
    if (files) {
      Array.from(files as Iterable<File>).forEach(file => {
        if (!file.type.startsWith('image/')) {
          return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
          setFilePreviews(prevState => [...prevState, reader.result as string])
        }

        reader.readAsDataURL(file)
      })
    }
    const prevFileList = Array.from(getValues('files') || [])
    const fileList = toFileList([
      ...prevFileList,
      ...Array.from(files as Iterable<File>),
    ])
    setValue('files', fileList || null, { shouldDirty: true })
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Form id="productForm" formMethods={formMethods} onSubmit={onSubmit}>
      <div className={styles.container}>
        <div className={styles.fields}>
          <FormInput name="title" label="Title" />
          <div className={styles.gallery}>
            {[...watch('imageUrls'), ...filePreviews].map((src, index) => (
              <div key={index} className={styles.imgContainer}>
                <Image
                  fill
                  sizes="(max-width: 1800px) 50vw"
                  src={src}
                  alt="фото"
                  className={styles.img}
                />
                <div className={styles.removeImg}>
                  <IconButton
                    color="error"
                    type="button"
                    onClick={() => removeFile(src, index)}
                  >
                    <Icon name="trash" color="white" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          <FormFile
            maxSizeMb={MAX_SIZE_FILE}
            maxFiles={filesLimit}
            disabled={isFilesLimit}
            onChange={handleChangeFile}
            accept="image/*"
            multiple
          />
          <div>
            Image max size {MAX_SIZE_FILE} Mb, max limit {MAX_FILES}
          </div>

          <div className={styles.groupButtons}>
            <Button type="submit" disabled={!isDirty}>
              Submit
            </Button>
            {isUpdateMode && (
              <Button
                type="button"
                variant="outlined"
                onClick={handleDeleteProduct}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </Form>
  )
}
