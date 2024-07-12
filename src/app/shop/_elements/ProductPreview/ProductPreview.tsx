'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/app/api/products/model'
import { useTranslation } from '@/store'
import styles from './ProductPreview.module.css'

export function ProductPreview({ product }: { product: Product }) {
  const { id, title, imageUrls } = product
  const { tAPI } = useTranslation()
  const url = imageUrls[0]

  return (
    <Link href={`/shop/product/${id}`} className={styles.card}>
      {!!url && (
        <div key={url} className={styles.imgContainer}>
          <Image
            fill
            priority
            src={url}
            alt={title}
            sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={styles.img}
          />
        </div>
      )}
      {tAPI('title', product)}
    </Link>
  )
}
