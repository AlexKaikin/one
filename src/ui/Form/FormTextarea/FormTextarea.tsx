'use client'

import { ComponentProps, forwardRef, Ref } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Textarea } from '@/ui'

type Props = ComponentProps<typeof Textarea>

function ForwardRef(props: Props, ref: Ref<HTMLTextAreaElement>) {
  const { name = '', defaultValue, ...rest } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Textarea
          {...field}
          {...rest}
          ref={ref}
          errorState={fieldState.error}
        />
      )}
    />
  )
}

export const FormTextarea = forwardRef(ForwardRef)
