'use client'

import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { NoteService } from '@/services'
import { useTranslation } from '@/store'
import { Profile } from '@/types'
import { Form, FormTextarea, Icon, IconButton, useNotify } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './CreateNote.module.css'

const schema = z.object({
  profile: z.string(),
  published: z.boolean(),
  imageUrls: z.string().array(),
  tags: z.string(),
  text: z
    .string({ required_error: 'Enter your post' })
    .min(1, { message: 'Enter your post' }),
})

export function CreateNote({ profile }: { profile: Profile }) {
  const { data } = useSession()
  const isMyProfile = profile.user.id === data?.user.id
  const { t } = useTranslation()
  const { notify } = useNotify()
  const { refresh } = useRouter()

  const formMethods = useForm<any>({
    defaultValues: {
      text: '',
      profile: profile.id,
      published: true,
      tags: '',
      imageUrls: [],
    },
    resolver: zodResolver(schema),
  })

  const { reset, watch } = formMethods

  const handleSubmit = async (data: any) => {
    try {
      await NoteService.create(data)
      refresh()
      reset()
    } catch (error) {
      notify({ type: 'error', message: t('globalError') })
    }
  }

  if (!isMyProfile) {
    return null
  }

  return (
    <Form id="noteForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <FormTextarea name="text" placeholder={t('new') + '...'} />

        {!!watch('text').length && (
          <div className={styles.control}>
            <IconButton color="primary" type="submit">
              <Icon name="send" width={16} height={16} />
            </IconButton>
          </div>
        )}
      </div>
    </Form>
  )
}
