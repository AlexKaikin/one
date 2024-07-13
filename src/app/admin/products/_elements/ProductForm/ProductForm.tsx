'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Product } from '@/app/api/products/model';
import { ProductService } from '@/services';
import { useTranslation } from '@/store';
import { Button, Form, FormCheckbox, FormFile, FormInput, FormTextarea, Icon, IconButton, Stack, Tab, Tabs, useNotify } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ProductForm.module.css';


const MAX_SIZE_FILE = 1
const MAX_FILES = 10

function getSchema(t: Function) {
  const more0 = t('more0')
  const required_error = t('required')
  const invalid_type_error = required_error

  const schema = z.object({
    id: z.string(),
    title: z.string({ required_error }).min(1, { message: required_error }),
    description: z
      .string({ required_error })
      .min(1, { message: required_error }),
    price: z.coerce
      .number({ required_error, invalid_type_error })
      .gte(1, { message: more0 }),
    inStock: z.coerce
      .number({ required_error, invalid_type_error })
      .gte(0, { message: more0 }),
    volume: z
      .string({ required_error, invalid_type_error })
      .min(1, { message: required_error }),
    imageUrls: z.string().array(),
    destroyImageUrls: z.string().array().optional(),
    published: z.boolean(),
    files: z
      .instanceof(typeof window === 'undefined' ? File : FileList)
      .optional(),
    translations: z.object({
      ru: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    }),
  })

  return schema
}

type Props = {
  defaultValues: Product
  onSubmit: (
    value: Product & { files: FileList | null; destroyImageUrls: string[] }
  ) => void
}

export function ProductForm({ defaultValues, onSubmit }: Props) {
  const { t } = useTranslation()
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const { notify } = useNotify()
  const router = useRouter()
  const isUpdateMode = !!defaultValues.id.length
  const formMethods = useForm<
    Product & { files: FileList | null; destroyImageUrls: string[] }
  >({ defaultValues, resolver: zodResolver(getSchema(t)) })
  const { formState, getValues, setValue, watch, reset } = formMethods
  const { isDirty, errors } = formState

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
    setFilePreviews([])
  }, [defaultValues, reset])

  console.log(watch(), errors)
  //console.log(defaultValues)

  return (
    <Form id="productForm" formMethods={formMethods} onSubmit={onSubmit}>
      <div>
        <div className={styles.col}>
          <Tabs>
            <Tab title="En" active>
              <div className={styles.container}>
                <Stack flexDirection="column" gap={1}>
                  <FormInput name="title" label={t('title')} />
                  <FormTextarea name="description" label={t('description')} rows={7} />

                  <Stack gap={1}>
                    <FormInput
                      name="inStock"
                      type="number"
                      label={t('inStock')}
                    />

                    <FormInput
                      name="price"
                      type="number"
                      label={t('price')}
                      startIcon={<div className={styles.inputIcon}>$</div>}
                    />

                    <FormInput name="volume" label={t('volume')} />
                  </Stack>

                  <FormCheckbox
                    name="published"
                    defaultChecked={getValues('published')}
                    label={t('published')}
                  />
                </Stack>
              </div>
            </Tab>
            <Tab title="Ru">
              <div className={styles.container}>
                <Stack flexDirection="column" gap={1}>
                  <FormInput name="translations.ru.title" label={t('title')} />
                  <FormTextarea
                    name="translations.ru.description"
                    label={t('description')}
                  />
                </Stack>
              </div>
            </Tab>
          </Tabs>

          <div className={styles.imagescontainer}>
            <Stack flexDirection="column" gap={1}>
              <div>{t('images')}</div>

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
                <p>
                  {t('maxSize')} {MAX_SIZE_FILE} Mb
                </p>
                <p>
                  {t('MaxLimit')} {MAX_FILES}
                </p>
              </div>
            </Stack>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.groupButtons}>
          <Button type="submit" disabled={!isDirty}>
            {t('save')}
          </Button>

          {isUpdateMode && (
            <Button
              type="button"
              variant="outlined"
              onClick={handleDeleteProduct}
            >
              {t('delete')}
            </Button>
          )}
        </div>
      </div>
    </Form>
  )
}