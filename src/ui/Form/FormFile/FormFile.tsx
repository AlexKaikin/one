'use client'

import { ReactNode } from 'react'
import { useTranslation } from '@/store'
import { Button, Icon, ImageLoader } from '@/ui'

type Props = {
  accept: HTMLInputElement['accept']
  multiple?: HTMLInputElement['multiple']
  onChange?: (files: FileList) => void
  maxSizeMb?: number
  maxFiles?: number
  disabled?: boolean
  trigger?: ReactNode
  loading?: boolean
}

export function FormFile({
  onChange,
  multiple = false,
  accept,
  maxSizeMb = 1,
  maxFiles = 10,
  disabled = false,
  trigger,
  loading = false,
}: Props) {
  const { t } = useTranslation()

  function handleFiles(files: FileList | null) {
    if (!files?.length) {
      return
    }

    if (onChange) {
      //@ts-ignore
      const filteredFiles = [...files]
        .filter(file => file.size < 1024 * 1024 * maxSizeMb)
        .slice(0, maxFiles) as FileList
      onChange(filteredFiles)
    }
  }

  function selectFile({
    contentType,
    multiple,
  }: {
    contentType: string
    multiple?: boolean
  }) {
    return new Promise(() => {
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = multiple || false
      input.accept = contentType

      input.onchange = () => {
        handleFiles(input.files)
      }

      input.click()
    })
  }

  if (trigger) {
    return (
      <>
        <ImageLoader loading={loading} />

        <div onClick={() => selectFile({ contentType: accept, multiple })}>
          {trigger}
        </div>
      </>
    )
  }

  return (
    <>
      <ImageLoader loading={loading} />

      <div onClick={() => selectFile({ contentType: accept, multiple })}>
        <Button
          type="button"
          startIcon={<Icon name="plus" height={20} width={20} />}
          disabled={disabled}
        >
          {t('image')}
        </Button>
      </div>
    </>
  )
}
