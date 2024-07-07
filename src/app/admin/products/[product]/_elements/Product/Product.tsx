'use client'

import { toFormData } from 'axios'
import { useRouter } from 'next/navigation'
import { Product as ProductType } from '@/app/api/products/model'
//import { toFormData } from '@/helpers'
import { ProductService } from '@/services'
import { useNotify } from '@/ui'
import { ProductForm } from '../../../_elements'

export function Product({ defaultValues }: { defaultValues: ProductType }) {
  const router = useRouter()
  const { notify } = useNotify()

  const onSubmit = async (data: ProductType) => {
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
    }
  }

  return <ProductForm defaultValues={defaultValues} onSubmit={onSubmit} />
}
