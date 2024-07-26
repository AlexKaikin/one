import React, { forwardRef, ComponentProps, Ref, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import { uuid } from '@/helpers'
import { FormFieldErrors } from '@/ui'
import styles from './Checkbox.module.css'

export type CheckboxProps = ComponentProps<'input'> & {
  label?: ReactNode
  errorState?: FieldError
}

function ForwardRef(props: CheckboxProps, ref: Ref<HTMLInputElement>) {
  const { id, label, errorState, ...rest } = props
  const checkboxId = uuid()

  return (
    <label className={styles.root}>
      <div className={styles.container}>
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          className={cn(styles.checkbox)}
          id={id || checkboxId}
        />
        {!!label && (
          <label htmlFor={id || checkboxId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
      {!!errorState?.message && <FormFieldErrors error={errorState} />}
    </label>
  )
}

export const Checkbox = forwardRef(ForwardRef)
