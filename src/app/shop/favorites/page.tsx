'use client'

import { useFavoriteProducts, useTranslation } from '@/store'
import { Page, PageContent } from '@/ui'
import { ProductPreview } from '../_elements'
import styles from '../page.module.css'

export default function FavoritesPage() {
  const { favoritesItems } = useFavoriteProducts()
  const { t } = useTranslation()

  if (!favoritesItems.length)
    return (
      <Page>
        <PageContent>{t('empty')}</PageContent>
      </Page>
    )

  return (
    <Page>
      <PageContent>
        <div className={styles.products}>
          {favoritesItems?.map(product => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </div>
      </PageContent>
    </Page>
  )
}
