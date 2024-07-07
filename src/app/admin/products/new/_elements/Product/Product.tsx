'use client'

import { useRouter } from 'next/navigation'
import { Product as ProductType } from '@/app/api/products/model'
import { toFormData } from '@/helpers'
import { ProductService } from '@/services'
import { useNotify } from '@/ui'
import { ProductForm } from '../../../_elements'

export function Product({ defaultValues }: { defaultValues: ProductType }) {
  const { notify } = useNotify()
  const router = useRouter()

  const onSubmit = async (data: ProductType) => {
    try {
      const { id, ...body } = data
      const response = await ProductService.create(
        toFormData(body) as ProductType
      )
      notify({ type: 'success', message: 'Completed successfully' })
      router.push(`/admin/products/${response.data.id}`)
      router.refresh()
    } catch (error) {
      notify({ type: 'error', message: 'Update error' })
    }
  }

  return <ProductForm defaultValues={defaultValues} onSubmit={onSubmit} />
}
