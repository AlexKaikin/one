'use client'

import React, { forwardRef, Ref } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, CheckboxProps } from '@/ui'

type Props = CheckboxProps & {
  name?: string
}

function ForwardRef(props: Props, ref: Ref<HTMLInputElement>) {
  const { name = '', ...rest } = props
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...field}
          {...rest}
          ref={ref}
          errorState={fieldState.error}
        />
      )}
    />
  )
}

export const FormCheckbox = forwardRef(ForwardRef)
