'use client'

import { FormHTMLAttributes, PropsWithChildren } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'
import styles from './Form.module.css'

type Props<Values extends FieldValues = FieldValues> = {
  formMethods: UseFormReturn<Values>
  onSubmit: SubmitHandler<Values>
  onSubmitError?: SubmitErrorHandler<Values>
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

export function Form<Values extends FieldValues = FieldValues>(
  props: PropsWithChildren<Props<Values>>
) {
  const { children, formMethods, onSubmit, onSubmitError, ...rest } = props
  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmit, onSubmitError)}
        className={styles.form}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  )
}
