'use client'

import React, { forwardRef, Ref } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { RadioButton, RadioButtonProps } from '@/ui'

type Props = RadioButtonProps & {
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
        <RadioButton
          {...field}
          {...rest}
          ref={ref}
          errorState={fieldState.error}
        />
      )}
    />
  )
}

export const FormRadioButton = forwardRef(ForwardRef)
