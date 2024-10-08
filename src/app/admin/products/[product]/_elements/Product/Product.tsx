'use client'

import { useState } from 'react'
import { toFormData } from 'axios'
import { useRouter } from 'next/navigation'
import { ProductService } from '@/services'
import { Product as ProductType } from '@/types'
import { ImageLoader, useNotify } from '@/ui'
import { ProductForm } from '../../../_elements'

export function Product({ defaultValues }: { defaultValues: ProductType }) {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotify()
  const router = useRouter()

  const onSubmit = async (
    data: ProductType & { files: FileList | null; destroyImageUrls: string[] }
  ) => {
    if (!!data.files?.length) {
      setLoading(true)
    }

    try {
      const { id, ...body } = data
      await ProductService.update(
        defaultValues.id,
        toFormData(body) as unknown as ProductType
      )
      notify({ type: 'success', message: 'Completed successfully' })

      router.refresh()
    } catch (error) {
      notify({ type: 'error', message: 'Update error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ImageLoader loading={loading} />
      <ProductForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  )
}
