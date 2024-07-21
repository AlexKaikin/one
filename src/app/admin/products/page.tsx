import { ApiError } from '@/helpers';
import { ProductService } from '@/services';
import { UrlParams } from '@/types';
import { Page, PageContent, PageHeader, Pagination } from '@/ui';
import { AddProductButton, Products } from './_elements';


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

export default async function ProductsPage(urlParams: UrlParams) {
  urlParams.searchParams.published = 'true'
  const data = await getProducts(urlParams)

  if (!data) {
    return null
  }

  const { products, totalCount } = data

  return (
    <Page>
      <PageHeader>
        <AddProductButton />
      </PageHeader>
      <PageContent>
        <Products products={products} />
        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}