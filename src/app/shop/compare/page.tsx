'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useCompareProducts, useTranslation } from '@/store'
import { Button, Page, PageContent, Rating, Spoiler, Stack } from '@/ui'
import { Characteristic } from '../_elements/Characteristic/Characteristic'
import styles from './page.module.css'

export default function ComparePage() {
  const { compareItems, toggleCompare } = useCompareProducts()
  const { t, tAPI } = useTranslation()

  if (!compareItems.length)
    return (
      <Page>
        <PageContent>{t('empty')}</PageContent>
      </Page>
    )

  return (
    <Page>
      <PageContent>
        <div className={cn(styles.products)}>
          {compareItems?.map(product => (
            <div key={product.id} className={styles.product}>
              <div className={styles.imgContainer}>
                <Image
                  src={product.imageUrls[0]}
                  fill
                  sizes="(max-width: 1800px) 50vw"
                  alt={product.title}
                />
              </div>
              <Link href={`/shop/product/${product.id}`}>
                {tAPI('title', product)}
              </Link>

              <Stack spacing={1}>
                {!!product.rating ? (
                  <>
                    <Rating value={product.rating} />({product.ratingCount})
                  </>
                ) : (
                  '-'
                )}
              </Stack>

              <div className={styles.characteristics}>
                <Characteristic value="manufacturer" product={product} />
                <Characteristic value="country" product={product} />
                <Characteristic value="city" product={product} />
                <Characteristic value="year" product={product} />
              </div>

              <Spoiler
                maxHeight={150}
                showLabel={t('show')}
                hideLabel={t('hide')}
              >
                {tAPI('description', product)}
              </Spoiler>
              <Button
                color="error"
                onClick={() => toggleCompare(product)}
                isFullWidth
              >
                {t('exclude')}
              </Button>
            </div>
          ))}
        </div>
      </PageContent>
    </Page>
  )
}
