'use client'

import { Product as ProductType } from '@/app/api/products/model'
import { useTranslation } from '@/store'
import { Page, PageContent, PageHeader } from '@/ui'
import { Product } from './_elements'

const defaultValues = {
  id: '',
  title: '',
  description: '',
  price: 0,
  volume: '',
  inStock: 0,
  imageUrls: [],
  published: false,
  translations: { ru: { title: '' } },
} as unknown as ProductType

export default function NewProductPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <PageHeader>{t('newProduct')}</PageHeader>
      <PageContent>
        <Product defaultValues={defaultValues} />
      </PageContent>
    </Page>
  )
}
