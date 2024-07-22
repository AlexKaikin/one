'use client'

import { forwardRef, Ref, ComponentProps, useState, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import cn from 'classnames'
import { FormFieldErrors } from '@/ui'
import styles from './Input.module.css'

type Props = ComponentProps<'input'> & {
  label?: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  errorState?: FieldError
  align?: 'left' | 'center' | 'right'
}

function ForwardRef(props: Props, ref: Ref<HTMLInputElement>) {
  const {
    errorState,
    label,
    startAdornment,
    align = 'left',
    endAdornment,
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
        {startAdornment && (
          <div className={styles.startAdornment}>{startAdornment}</div>
        )}

        <input
          onFocus={() => setFocus(true)}
          className={cn(styles.input, { [styles[align]]: align })}
          ref={ref}
          {...rest}
          onBlur={() => setFocus(false)}
        />

        {endAdornment && (
          <div className={styles.endAdornment}>{endAdornment}</div>
        )}
      </div>
      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </div>
  )
}

export const Input = forwardRef(ForwardRef)
