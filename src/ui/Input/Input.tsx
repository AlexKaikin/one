'use client'

import { forwardRef, Ref, ComponentProps, useState, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import { FormFieldErrors } from '@/ui'
import styles from './Input.module.css'

type Props = ComponentProps<'input'> & {
  label?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  errorState?: FieldError
  align?: 'left' | 'center' | 'right'
}

function ForwardRef(props: Props, ref: Ref<HTMLInputElement>) {
  const {
    errorState,
    label,
    startIcon,
    align = 'left',
    endIcon,
    ...rest
  } = props
  const [focus, setFocus] = useState(false)

  return (
    <div className={styles.wrapper}>
      {label && <label className={cn(styles.label)}>{label}</label>}

      <div
        className={cn({
          [styles.field]: rest.type !== 'hidden',
          [styles.focus]: focus,
        })}
      >
        {startIcon && startIcon}

        <input
          onFocus={() => setFocus(true)}
          className={cn(styles.input, { [styles[align]]: align })}
          ref={ref}
          {...rest}
          onBlur={() => setFocus(false)}
        />

        {endIcon && endIcon}
      </div>
      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </div>
  )
}

export const Input = forwardRef(ForwardRef)
