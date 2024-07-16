'use client'

import { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { useTranslation } from '@/store'
import { UserRegistration } from '@/types'
import {
  Button,
  Form,
  FormFieldErrors,
  FormInput,
  Page,
  PageContent,
  Stack,
  Typography,
} from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './page.module.css'

function getSchema(t: Function) {
  const required_error = t('required')

  const schema = z.object({
    email: z
      .string({ required_error })
      .min(1, { message: required_error })
      .email('no correct'),
    password: z
      .string({ required_error })
      .min(8, { message: t('min8') })
      .max(32, { message: t('max32') }),
  })

  return schema
}

export default function Register() {
  const { t } = useTranslation()
  const session = useSession()
  const [error, setError] = useState<string | null>(null)

  const formMethods = useForm<UserRegistration>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(getSchema(t)),
  })

  const onSubmit = async (data: UserRegistration) => {
    try {
      const res = await signIn('credentials', { ...data, redirect: false })

      if (res?.error) setError(t('invalidCredentials'))
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 500) {
          setError(error.response?.data.message)
        }
      }
    }
  }

  if (session.status === 'loading') return null
  if (session?.data?.user) redirect('/account')

  return (
    <Page>
      <PageContent style={{ height: '100%' }}>
        <div className={styles.col}>
          <div className={styles.content}>
            <Typography variant="h2">{t('login')}</Typography>

            <Form
              id="registerForm"
              formMethods={formMethods}
              onSubmit={onSubmit}
            >
              <FormInput name="email" label={t('email')} />

              <FormInput
                name="password"
                label={t('password')}
                type="password"
              />

              <Stack spacing={1}>
                {t('dontAccount')}

                <Link href="/register" style={{ textDecoration: 'underline' }}>
                  {t('registration')}
                </Link>
              </Stack>

              {error && (
                <FormFieldErrors error={{ message: error } as FieldError} />
              )}

              <Button type="submit">{t('send')}</Button>
            </Form>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
