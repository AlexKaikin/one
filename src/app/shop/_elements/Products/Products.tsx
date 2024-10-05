'use client'

import { Product } from '@/types'
import { Button, Pagination, Stack, Typography } from '@/ui'
import imageSrc from '../../../../assets/images/common/empty-favorites.png'
import { ProductPreview } from '../ProductPreview/ProductPreview'
import styles from './Products.module.css'
import Image from 'next/image'

type Props = {
  products: Product[]
  totalCount: string
}

export function Products({ products, totalCount }: Props) {
  if (!products.length) {
    return (
      <Stack alignItems="center" justifyContent="center" isWide>
        <Stack flexDirection="column" spacing={2} alignItems="center">
          <div>
            <Image height={300} width={300} src={imageSrc} alt="No products" />
          </div>

          <Typography variant="h2" align="center">
            No products
          </Typography>

          <Typography variant="p" align="center">
            No products found, please come back later.
          </Typography>

          <Button href="/">Go home</Button>
        </Stack>
      </Stack>
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
