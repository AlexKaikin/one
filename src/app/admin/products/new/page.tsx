import { Product as ProductType } from '@/app/api/products/model'
import { Page, PageContent, PageHeader } from '@/ui'
import { Product } from './_elements'

const defaultValues = {
  id: '',
  title: '',
  imageUrls: [],
  translations: { ru: { title: '' } },
} as unknown as ProductType

export default function NewProductPage() {
  return (
    <Page>
      <PageHeader>New product</PageHeader>
      <PageContent>
        <Product defaultValues={defaultValues} />
      </PageContent>
    </Page>
  )
}
