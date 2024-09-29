'use client'

import { Product } from '@/types'
import { Button, Pagination, Stack, Typography } from '@/ui'
import { ProductPreview } from '../ProductPreview/ProductPreview'
import styles from './Products.module.css'

type Props = {
  products: Product[]
  totalCount: string
}

export function Products({ products, totalCount }: Props) {

  if (!products.length) {
    return (
      <div className={styles.empty}>
        <Stack flexDirection="column" spacing={2} alignItems="center">
          <Typography variant="h2">No products</Typography>
          <Typography variant="p" align="center">
            No products found, please come back later.
          </Typography>
          <Button href="/">Go home</Button>
        </Stack>
      </div>
    )
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
