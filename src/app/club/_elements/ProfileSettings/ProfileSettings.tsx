'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { z } from 'zod';
import defaulAvatarUrl from '@/assets/images/user/defaultAvatar.png';
import '@/services';
import { UserService } from '@/services';
import { useTranslation } from '@/store';
import { User } from '@/types';
import { IconButton, Form, FormInput, FormCheckbox, Button, FormTextarea, Stack, Icon, useNotify, Page, PageContent, FormFile, ImageLoader } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ProfileSettings.module.css';


const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  location: z.string().optional(),
  avatarUrl: z.string().optional().nullable(),
  about: z.string().optional(),
  interests: z.coerce
    .string()
    .transform(value => value.split(',').map(item => item.trim())),
  files: z
    .instanceof(typeof window === 'undefined' ? File : FileList)
    .optional(),
  destroyImageUrls: z.string().array().optional(),
})

export function ProfileSettings({ defaultValues }: { defaultValues: User }) {
  const [loading, setLoading] = useState(false)
  const [filePreviews, setFilePreviews] = useState<string[]>([
    defaultValues.avatarUrl || defaulAvatarUrl.src,
  ])

  const { t } = useTranslation()
  const { notify } = useNotify()

  const formMethods = useForm<
    User & {
      interests: string
      files: FileList | null
      destroyImageUrls: string[]
    }
  >({
    defaultValues: {
      ...defaultValues,
      interests: defaultValues.interests?.join(', '),
    },
    resolver: zodResolver(schema),
  })
  const { formState, getValues, setValue, reset } = formMethods
  const { isDirty } = formState

  const handleChangeFile = (files: FileList) => {
    if (files) {
      Array.from(files as Iterable<File>).forEach(file => {
        if (!file.type.startsWith('image/')) {
          return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
          setFilePreviews([reader.result] as string[])
        }

        reader.readAsDataURL(file)
      })
    }

    const fileList = toFileList([...Array.from(files as Iterable<File>)])

    setValue('files', fileList, { shouldDirty: true })
  }

  function toFileList(files: File[]) {
    const dataTransfer = new DataTransfer()
    files.forEach(file => dataTransfer.items.add(file))
    return dataTransfer.files
  }

  function removeFile() {
    if (defaultValues.avatarUrl === filePreviews[0]) {
      setValue('destroyImageUrls', [...filePreviews])
    }

    const files = Array.from(getValues('files') || [])

    setFilePreviews([defaulAvatarUrl.src as unknown as string])
    setValue('files', toFileList(files), { shouldDirty: true })
    setValue('avatarUrl', defaulAvatarUrl.src as unknown as string)
  }

  const handleSubmit = async (
    data: User & { files: FileList | null; destroyImageUrls: string[] }
  ) => {
    if (!!data.files?.length) {
      setLoading(true)
    }

    try {
      const response = await UserService.update(defaultValues.id, data)
      reset(response.data)
      notify({ type: 'success', message: 'Completed successfully' })
    } catch (error) {
      notify({ type: 'error', message: 'Update error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <PageContent>
        <ImageLoader loading={loading} />
        <Form
          formMethods={formMethods}
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.avatar}>
            <div className={styles.imgContainer}>
              <Image
                fill
                sizes="(max-width: 1800px) 50vw"
                src={filePreviews[0]}
                className={styles.img}
                alt="avatar"
                priority
              />

              <div className={styles.avatarChange}>
                <FormFile
                  maxSizeMb={1}
                  onChange={handleChangeFile}
                  accept="image/*"
                  trigger={
                    <IconButton type="button" className={styles.btn}>
                      <Icon name="upload" width={16} height={16} />
                    </IconButton>
                  }
                />

                <IconButton
                  type="button"
                  onClick={removeFile}
                  className={styles.btn}
                >
                  <Icon name="trash" width={16} height={16} />
                </IconButton>
              </div>
            </div>
          </div>

          <Stack flexDirection="column" spacing={2} isWide>
            <Stack flexDirection="row" spacing={2}>
              <FormInput name="firstName" label={t('firstName')} />

              <FormInput name="lastName" label={t('lastName')} />
            </Stack>

            <FormTextarea name="about" label={t('aboutMe')} />

            <FormInput
              name="interests"
              label={`${t('interests')} (${t('separatedByCommas')})`}
            />
            <FormInput name="location" label={t('location')} />
            {/* <FormCheckbox name="private" label="Hidden profile" /> */}
            <Stack
              flexDirection="row"
              spacing={2}
              justifyContent="space-between"
            >
              <Button type="submit" disabled={!isDirty}>
                {t('save')}
              </Button>
            </Stack>
          </Stack>
        </Form>
      </PageContent>
    </Page>
  )
}