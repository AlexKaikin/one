'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { TranslationKeys } from '@/langs';
import { ProductService } from '@/services';
import { useTranslation } from '@/store';
import { Post } from '@/types';
import { Button, Form, FormCheckbox, FormFile, FormInput, FormTextarea, Icon, IconButton, Select, SelectOption, Stack, Tab, Tabs, Typography, useNotify } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './PostForm.module.css'

const MAX_SIZE_FILE = 1
const MAX_FILES = 10

function getSchema(t: Function) {
  const required_error = t('required')

  const schema = z.object({
    id: z.string(),
    title: z.string({ required_error }).min(1, { message: required_error }),
    category: z.string({ required_error }).min(1, { message: required_error }),
    text: z.string({ required_error }).min(1, { message: required_error }),
    imageUrls: z.string().array(),
    destroyImageUrls: z.string().array().optional(),
    published: z.boolean(),
    files: z
      .instanceof(typeof window === 'undefined' ? File : FileList)
      .optional(),
    translations: z.object({
      ru: z.object({
        title: z.string().optional(),
        text: z.string().optional(),
      }),
    }),
  })

  return schema
}

type Props = {
  defaultValues: Post
  onSubmit: (
    value: Post & { files: FileList | null; destroyImageUrls: string[] }
  ) => void
}

export function PostForm({ defaultValues, onSubmit }: Props) {
  const { t } = useTranslation()
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const { notify } = useNotify()
  const router = useRouter()
  const isUpdateMode = !!defaultValues.id.length
  const formMethods = useForm<
    Post & { files: FileList | null; destroyImageUrls: string[] }
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

  const handleChangeCategory = useCallback(
    (value: string) => {
      setValue('category', value, { shouldValidate: true, shouldDirty: true })
    },
    [setValue]
  )

  useEffect(() => {
    reset(defaultValues)
    setFilePreviews([])
  }, [defaultValues, reset])

  return (
    <Form id="productForm" formMethods={formMethods} onSubmit={onSubmit}>
      <div>
        <div className={styles.col}>
          <Tabs>
            <Tab title="En" active>
              <div className={styles.container}>
                <Stack flexDirection="column" spacing={2}>
                  <FormInput name="title" label={t('title')} />

                  <Select
                    label={`${t('category')}: `}
                    defaultSelectValue={
                      <>{t(watch('category') as TranslationKeys)}</>
                    }
                    onSelectChange={handleChangeCategory}
                    errorState={errors.category}
                  >
                    <SelectOption value={'reviews'}>{t('reviews')}</SelectOption>
                    <SelectOption value={'instructions'}>{t('instructions')}</SelectOption>
                    <SelectOption value={'traditions'}>{t('traditions')}</SelectOption>
                  </Select>

                  <FormTextarea name="text" label={t('text')} rows={10} />

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
                <Stack flexDirection="column" spacing={2}>
                  <FormInput name="translations.ru.title" label={t('title')} />

                  <FormTextarea
                    name="translations.ru.text"
                    label={t('text')}
                    rows={7}
                  />
                </Stack>
              </div>
            </Tab>
          </Tabs>

          <div className={styles.imagescontainer}>
            <Stack flexDirection="column" spacing={1}>
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
                        <Icon
                          name="trash"
                          color="white"
                          width={20}
                          height={20}
                        />
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