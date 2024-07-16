import { ApiError } from '@/helpers'
import { ProductService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent, PageHeader } from '@/ui'
import { Product, Title } from './_elements'

async function getProduct(id: string) {
  try {
    const { data } = await ProductService.getOne(id)
    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function ProductPage(urlParams: UrlParams) {
  const product = await getProduct(urlParams.params!.product!)

  if (!product) {
    return null
  }

  return (
    <Page>
      <PageHeader><Title /></PageHeader>
      <PageContent>
        <Product defaultValues={product} />
      </PageContent>
    </Page>
  )
}
