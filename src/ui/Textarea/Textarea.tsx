'use client'

import { forwardRef, Ref, ComponentProps, useState } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import { FormFieldErrors } from '@/ui'
import styles from './Textarea.module.css'

type Props = ComponentProps<'textarea'> & {
  label?: string
  errorState?: FieldError
}

function ForwardRef(props: Props, ref: Ref<HTMLTextAreaElement>) {
  const { errorState, label, ...rest } = props
  const [focus, setFocus] = useState(false)

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={cn(styles.field, { [styles.focus]: focus })}>
        <textarea
          className={cn(styles.textarea)}
          ref={ref}
          onFocus={() => setFocus(true)}
          {...rest}
          onBlur={() => setFocus(false)}
        />
      </div>

      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </div>
  )
}

export const Textarea = forwardRef(ForwardRef)
