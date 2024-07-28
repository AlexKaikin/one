'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product as ProductType } from '@/types'
import { toFormData } from '@/helpers'
import { ProductService } from '@/services'
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
      const response = await ProductService.create(
        toFormData(body) as unknown as ProductType
      )

      notify({ type: 'success', message: 'Completed successfully' })
      router.push(`/admin/products/${response.data.id}`)
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
