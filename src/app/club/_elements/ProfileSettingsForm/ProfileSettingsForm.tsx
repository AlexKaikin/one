'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import defaulAvatarUrl from '@/assets/images/user/defaultAvatar.png'
import { PROFILE_TYPES } from '@/constants'
import '@/services'
import { ProfileService } from '@/services'
import { useTranslation } from '@/store'
import { Profile, User } from '@/types'
import {
  IconButton,
  Form,
  FormInput,
  FormCheckbox,
  Button,
  FormTextarea,
  Stack,
  Icon,
  useNotify,
  Page,
  PageContent,
  FormFile,
} from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './ProfileSettingsForm.module.css'

type Props = {
  defaultValues: Profile
  onSubmit: (
    data: Profile & { files: FileList | null; destroyImageUrls: string[] }
  ) => void
  loading: boolean
}

const schema = z.object({
  companyName: z.string().optional(),
  location: z.string().optional(),
  about: z.string().optional(),
  interests: z.string().optional(),
  avatarUrl: z.string().optional().nullable(),
  type: z.string(),
  user: z.object({
    id: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }),
  files: z
    .instanceof(typeof window === 'undefined' ? File : FileList)
    .optional(),
  destroyImageUrls: z.string().array().optional(),
})

export function ProfileSettingsForm(props: Props) {
  const { defaultValues, onSubmit, loading } = props
  const [filePreviews, setFilePreviews] = useState<string[]>([
    defaultValues.avatarUrl || defaulAvatarUrl.src,
  ])

  const { t } = useTranslation()

  const formMethods = useForm<
    Omit<Profile, 'interests'> & {
      files: FileList | null
      destroyImageUrls: string[]
      interests: string
    }
  >({
    defaultValues,
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

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Page>
      <PageContent>
        <Form
          formMethods={formMethods}
          onSubmit={onSubmit}
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
                  loading={loading}
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
              {defaultValues.type === PROFILE_TYPES.USER ? (
                <>
                  <FormInput name="user.firstName" label={t('firstName')} />
                  <FormInput name="user.lastName" label={t('lastName')} />
                </>
              ) : (
                <FormInput name="companyName" label={t('name')} />
              )}
            </Stack>

            <FormTextarea
              name="about"
              label={t(
                defaultValues.type === PROFILE_TYPES.USER
                  ? 'aboutMe'
                  : 'description'
              )}
            />

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
