'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { UserService } from '@/services'
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

  const handleSubmit = async (data: UserRegistration) => {
    try {
      await UserService.create(data)
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
            <h1>Registration</h1>
            <Form
              id="registerForm"
              formMethods={formMethods}
              onSubmit={handleSubmit}
            >
              <FormInput name="email" label="Email" />
              <FormInput name="password" label="Password" type="password" />
              {error && <div>{error}</div>}
              <div>
                Already have an account?{' '}
                <Link href="/login" style={{ textDecoration: 'underline' }}>
                  Login
                </Link>
              </div>
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
