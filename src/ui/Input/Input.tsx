'use client'

import { forwardRef, Ref, ComponentProps, useState, ReactNode, CSSProperties } from 'react'
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
  color?: CSSProperties['color']
  border?: CSSProperties['border']
  spacing?: number
}

function ForwardRef(props: Props, ref: Ref<HTMLInputElement>) {
  const { errorState, color, spacing = 1, border, label, startAdornment, align = 'left', endAdornment, ...rest } = props
  const [focus, setFocus] = useState(false)
  const backgroundColor = color || 'color-mix(in srgb, var(--text), transparent 95%)'
  const borderLine = border || 'color-mix(in srgb, var(--text), transparent 95%)'
  const padding = `calc(var(--spacing) * ${spacing})`

  return (
    <div className={styles.wrapper}>
      {label && <label className={cn(styles.label)}>{label}</label>}

      <div
        className={cn({
          [styles.field]: rest.type !== 'hidden',
          [styles.focus]: focus,
        })}
        style={{ backgroundColor, border: borderLine }}
      >
        {startAdornment && <div className={styles.startAdornment}>{startAdornment}</div>}

        <input
          onFocus={() => setFocus(true)}
          className={cn(styles.input, { [styles[align]]: align, [styles[`spacing${spacing}`]]: spacing })}
          style={{ padding }}
          ref={ref}
          {...rest}
          onBlur={() => setFocus(false)}
        />

        {endAdornment && <div className={styles.endAdornment}>{endAdornment}</div>}
      </div>
      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </div>
  )
}

export const Input = forwardRef(ForwardRef)
