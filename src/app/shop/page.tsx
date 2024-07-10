import { ApiError } from '@/helpers'
import { ProductService } from '@/services'
import { UrlParams } from '@/types'
import { Icon, Page, PageContent, PageHeader, Pagination } from '@/ui'
import { ProductPreview } from './_elements'
import styles from './page.module.css'

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
        <div className={styles.header}>
          <div>Shop</div>
          <div className={styles.group}>
            <div className={styles.groupItem}>
              <Icon name="filter" /> Filter
            </div>
            <div className={styles.groupItem}>
              <Icon name="sort" /> Sorting: <span className={styles.sortActive}>new</span>
            </div>
          </div>
        </div>
      </PageHeader>
      <PageContent>
        <div className={styles.products}>
          {products.map(product => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </div>
        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}
