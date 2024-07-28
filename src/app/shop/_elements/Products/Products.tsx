'use client'

import { useTranslation } from '@/store'
import { Product } from '@/types'
import { Pagination } from '@/ui'
import { ProductPreview } from '../ProductPreview/ProductPreview'
import styles from './Products.module.css'

type Props = {
  products: Product[]
  totalCount: string
}

export function Products({ products, totalCount }: Props) {
  const { t } = useTranslation()

  if (!products.length) {
    return <>{t('empty')}</>
  }

  return (
    <>
      <div className={styles.products}>
        {products.map(product => (
          <ProductPreview key={product.id} product={product} />
        ))}
      </div>

      <Pagination totalCount={totalCount} />
    </>
  )
}
