'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { UserService } from '@/services';
import { useTranslation } from '@/store';
import { UserRegistration } from '@/types';
import { Button, Form, FormInput, Page, PageContent, Stack, Typography } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './page.module.css';


function getSchema(t: Function) {
  const required_error = t('required')
  const message = required_error

  const schema = z.object({
    email: z.string({ required_error }).min(1, { message }).email('no correct'),
    firstName: z.string({ required_error }).min(1, { message }),
    password: z
      .string({ required_error })
      .min(8, { message: t('min8') })
      .max(32, { message: t('max32') }),
  })

  return schema
}

export default function Register() {
  const { t } = useTranslation()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const formMethods = useForm<UserRegistration>({
    defaultValues: { email: '', password: '', firstName: '' },
    resolver: zodResolver(getSchema(t)),
  })

  const handleSubmit = async (data: UserRegistration) => {
    try {
      await UserService.create(data)
      router.push('/login')
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 500) {
          setError(error.response?.data.message)
        }
      }
    }
  }

  return (
    <Page>
      <PageContent style={{ height: '100%' }}>
        <div className={styles.col}>
          <div className={styles.content}>
            <Typography variant="h2">{t('registration')}</Typography>
            <Form
              id="registerForm"
              formMethods={formMethods}
              onSubmit={handleSubmit}
            >
              <FormInput name="email" label={t('email')} />
              <FormInput name="firstName" label={t('name')} />
              <FormInput
                name="password"
                label={t('password')}
                type="password"
              />
              {error && <div>{error}</div>}
              <Stack spacing={1}>
                {t('haveAccount')}
                <Link href="/login" style={{ textDecoration: 'underline' }}>
                  {t('login')}
                </Link>
              </Stack>
              <Button type="submit">{t('send')}</Button>
            </Form>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}