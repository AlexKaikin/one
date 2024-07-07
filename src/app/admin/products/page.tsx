import Link from 'next/link';
import { ApiError } from '@/helpers';
import { ProductService } from '@/services';
import { UrlParams } from '@/types';
import { Button, List, Page, PageContent, PageHeader, Pagination } from '@/ui'

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

export default async function Shop(urlParams: UrlParams) {
 const data = await getProducts(urlParams)

  if (!data) {
    return null
  }

  const { products, totalCount } = data

  return (
    <Page>
      <PageHeader>
        <Link href={'/admin/products/new'}>
          <Button>Add</Button>
        </Link>
      </PageHeader>
      <PageContent>
        <List>
          {products.map(({ id, title }) => (
            <Link key={id} href={`/admin/products/${id}`}>
              {title}
            </Link>
          ))}
        </List>
        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}