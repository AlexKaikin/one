'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ApiError } from '@/helpers';
import { UserService } from '@/services';
import { useTranslation } from '@/store';
import { User } from '@/types';
import { Button, Form, FormInput, useNotify } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './UserForm.module.css';


function getSchema(t: Function) {
  const required_error = t('required')
  const message = required_error

  const schema = z.object({
    id: z.string(),
    email: z
      .string({ required_error })
      .min(1, { message: required_error })
      .email('no correct'),
    lastName: z.string().optional(),
    firstName: z.string({ required_error }).min(1, { message }),
  })
  return schema
}

export function UserForm({ defaultValues }: { defaultValues: User }) {
  const { t } = useTranslation()
  const { notify } = useNotify()
  const formMethods = useForm<User>({ resolver: zodResolver(getSchema(t)) })
  const { reset, formState } = formMethods
  const { isDirty } = formState

  const onSubmit = async (data: User) => {
    try {
      const response = await UserService.update(defaultValues.id, data)
      reset(response.data)
      notify({ type: 'info', message: t('updated') })
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
          <FormInput name="email" label={t('email')} readOnly />
          <FormInput name="firstName" label={t('firstName')} />
          <FormInput name="lastName" label={t('lastName')} />
          <Button type="submit" disabled={!isDirty}>
            {t('save')}
          </Button>
        </div>
        <div></div>
      </div>
    </Form>
  )
}