'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { UserRegistration } from '@/types'
import { Button, Form, FormInput, Page, PageContent } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './page.module.css'

const required_error = 'Required'

const schema = z.object({
  email: z
    .string({ required_error })
    .min(1, { message: required_error })
    .email('no correct'),
  password: z
    .string({ required_error })
    .min(8, { message: 'min 8' })
    .max(32, { message: 'max 32' }),
})

export default function Register() {
  const session = useSession()
  const [error, setError] = useState<string | null>(null)

  const formMethods = useForm<UserRegistration>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: UserRegistration) => {
    try {
      const res = await signIn('credentials', { ...data, redirect: false })

      if (res?.error) setError('Invalid credentials')
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
            <h1>Log In</h1>
            <Form
              id="registerForm"
              formMethods={formMethods}
              onSubmit={onSubmit}
            >
              <FormInput name="email" label="Email" />
              <FormInput name="password" label="Password" type="password" />
              <div>
                Don&rsquo;t have an account?{' '}
                <Link href="/register" style={{ textDecoration: 'underline' }}>
                  Registration
                </Link>
              </div>
              {error && <div>{error}</div>}
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
