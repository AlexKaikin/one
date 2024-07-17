'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import { Product as ProductType } from '@/app/api/products/model'
import { useTranslation } from '@/store'
import { Rating, Stack, Typography } from '@/ui'
import { Actions } from '../Actions/Actions'
import { NotAvailable } from '../NotAvailable/NotAvailable'
import { Slider } from '../Slider/Slider'
import styles from './Product.module.css'

export function Product({ product }: { product: ProductType }) {
  const { t, tAPI } = useTranslation()
  const newProduct =
    dayjs(new Date()).diff(dayjs(product.createdAt), 'month') < 15
  const popProduct = product.ratingCount > 1

  return (
    <div className={styles.product}>
      <Slider imageUrls={product.imageUrls} />

      <Stack isWide flexDirection="column" spacing={2}>
        <Stack flexDirection="column">
          <Stack alignItems="center" justifyContent="space-between" spacing={2}>
            {product.inStock > 0 ? (
              <div className={styles.inStock}>{t('inStock')}</div>
            ) : (
              <div className={styles.ended}>{t('ended')}</div>
            )}

            <div className={styles.labels}>
              {newProduct && <span className={styles.new}>new</span>}
              {popProduct && <span className={styles.pop}>pop</span>}
            </div>
          </Stack>

          <Typography variant="h1">{tAPI('title', product)}</Typography>
        </Stack>

        <Rating value={4} />

        <Typography variant="p">{product.volume} gramm</Typography>

        <Actions product={product} />
        <NotAvailable product={product} />

        <Stack flexDirection="column" spacing={1}>
          <Typography variant="h3">{t('description')}</Typography>
          <Typography variant="p">{tAPI('description', product)}</Typography>
        </Stack>

        {/* <Stack flexDirection="column" spacing={1}>
          <Typography variant="h3">{t('reviews')}</Typography>
        </Stack> */}
      </Stack>
    </div>
  )
}
