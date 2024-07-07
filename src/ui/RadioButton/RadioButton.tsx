import React, { forwardRef, ComponentProps, Ref } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import { FormFieldErrors } from '@/ui'
import styles from './RadioButton.module.css'

export type RadioButtonProps = ComponentProps<'input'> & {
  label?: string
  errorState?: FieldError
}

function ForwardRef(props: RadioButtonProps, ref: Ref<HTMLInputElement>) {
  const { label, errorState, ...rest } = props

  return (
    <label className={styles.root}>
      <div className={styles.container}>
        <input {...rest} ref={ref} type="radio" className={cn(styles.radio)} />
        {label ? <span>{label}</span> : null}
      </div>
      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </label>
  )
}

export const RadioButton = forwardRef(ForwardRef)
