import { ApiError } from '@/helpers'
import { ProductService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent } from '@/ui'
import { Products } from '../../_elements'

async function getProducts(urlParams: UrlParams) {
  try {
    const response = await ProductService.getAll(urlParams)
    const products = response.data
    const totalCount = response.headers['x-total-count']

    return { products, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function CategoryPage(urlParams: UrlParams) {
  const category = urlParams.params?.category
  if (category) urlParams.searchParams.category = category

  const data = await getProducts(urlParams)

  if (!data) {
    return null
  }

  const { products, totalCount } = data

  return (
    <Page>
      <PageContent>
        <Products products={products} totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}
