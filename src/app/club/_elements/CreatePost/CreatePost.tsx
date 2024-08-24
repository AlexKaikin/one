'use client'

import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { useTranslation } from '@/store'
import { Profile } from '@/types'
import { Form, FormTextarea, Icon, IconButton, useNotify } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './CreatePost.module.css'

const schema = z.object({
  text: z
    .string({ required_error: 'Enter your post' })
    .min(1, { message: 'Enter your post' }),
})

export function CreatePost({ profile }: { profile: Profile }) {
  const { data } = useSession()
  const isMyProfile = profile.user.id === data?.user.id
  const { t } = useTranslation()
  const { notify } = useNotify()

  const formMethods = useForm<any>({
    defaultValues: { text: '' },
    resolver: zodResolver(schema),
  })

  const { reset, watch } = formMethods

  const handleSubmit = async (data: any) => {
    try {
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
        <FormTextarea name="text" placeholder="New post..." />

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
