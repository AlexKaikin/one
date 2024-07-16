import { ApiError } from '@/helpers'
import { ProductService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent } from '@/ui'
import { Product } from './_elements/Product/Product'

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
      <PageContent>
        <Product product={product} />
      </PageContent>
    </Page>
  )
}
