'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ApiError } from '@/helpers'
import { UserService } from '@/services'
import { User } from '@/types'
import { Button, Form, FormInput } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './UserForm.module.css'

const required_error = 'Required'

const schema = z.object({
  id: z.string(),
  email: z
    .string({ required_error })
    .min(1, { message: required_error })
    .email('no correct'),
  lastName: z.string().optional(),
  firstName: z.string().optional(),
})

export function UserForm({ defaultValues }: { defaultValues: User }) {
  const formMethods = useForm<User>({ resolver: zodResolver(schema) })
  const { reset, formState } = formMethods
  const { isDirty } = formState

  const onSubmit = async (data: User) => {
    try {
      const response = await UserService.update(defaultValues.id, data)
      reset(response.data)
    } catch (error) {
      ApiError(error)
    }
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Form id="userForm" formMethods={formMethods} onSubmit={onSubmit}>
      <div className={styles.container}>
        <div className={styles.fields}>
          <FormInput name="email" label="Email" readOnly />
          <FormInput name="lastName" label="Last name" />
          <FormInput name="firstName" label="First name" />
          <Button type="submit" disabled={!isDirty}>
            Submit
          </Button>
        </div>
        <div></div>
      </div>
    </Form>
  )
}
