'use client'

import { ComponentProps, forwardRef, Ref } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/ui'

type Props = ComponentProps<typeof Input>

function ForwardRef(props: Props, ref: Ref<HTMLInputElement>) {
  const { name = '', defaultValue = '', ...rest } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Input {...field} {...rest} ref={ref} errorState={fieldState.error} />
      )}
    />
  )
}

export const FormInput = forwardRef(ForwardRef)
