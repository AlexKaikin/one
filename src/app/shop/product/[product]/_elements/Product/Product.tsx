'use client'

import dayjs from 'dayjs'
import { Product as ProductType } from '@/app/api/products/model'
import { Review as ReviewType } from '@/app/api/reviews/model'
import { useTranslation } from '@/store'
import { Rating, Stack, Typography } from '@/ui'
import { Characteristic } from '../../../../_elements/Characteristic/Characteristic'
import { Actions } from '../Actions/Actions'
import { AddReview } from '../AddReview/AddReview'
import { NotAvailable } from '../NotAvailable/NotAvailable'
import { Review } from '../Review/Review'
import { Slider } from '../Slider/Slider'
import styles from './Product.module.css'

type Props = { product: ProductType; reviews: ReviewType[] }

export function Product({ product, reviews }: Props) {
  const { t, tAPI } = useTranslation()
  const isCharacteristicsEmpty =
    !product.characteristics.city &&
    !product.characteristics.country &&
    !product.characteristics.manufacturer &&
    !product.characteristics.year
  const newProduct =
    dayjs(new Date()).diff(dayjs(product.createdAt), 'month') < 15
  const popProduct = product.ratingCount > 1

  return (
    <div className={styles.product}>
      <Slider imageUrls={product.imageUrls} />

      <Stack isWide flexDirection="column" spacing={4}>
        <Stack flexDirection="column" spacing={2}>
          <Stack flexDirection="column">
            <Stack
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
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

          {!!product.rating && (
            <Stack spacing={1}>
              <Rating value={product.rating} />({product.ratingCount})
            </Stack>
          )}

          <Typography variant="p">
            {t(product.volumeMeasurement)}: {product.volume}
          </Typography>

          <Actions product={product} />

          <NotAvailable product={product} />
        </Stack>

        <Stack flexDirection="column" spacing={1}>
          <Typography variant="h3">{t('description')}</Typography>
          <Typography variant="p">{tAPI('description', product)}</Typography>
        </Stack>

        {!isCharacteristicsEmpty && (
          <Stack
            flexDirection="column"
            spacing={1}
            className={styles.characteristicsWrap}
          >
            <Typography variant="h3">{t('characteristics')}</Typography>

            <div className={styles.characteristics}>
              <Characteristic
                hideIfNot
                value="manufacturer"
                product={product}
              />
              <Characteristic hideIfNot value="country" product={product} />
              <Characteristic hideIfNot value="city" product={product} />
              <Characteristic hideIfNot value="year" product={product} />
            </div>
          </Stack>
        )}

        <Stack flexDirection="column" spacing={1}>
          <AddReview product={product} />

          <Stack flexDirection="column" spacing={2}>
            {reviews.map(review => (
              <Review key={review.id} review={review} />
            ))}

            {!reviews.length && <>{t('noReviews')}</>}
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}
