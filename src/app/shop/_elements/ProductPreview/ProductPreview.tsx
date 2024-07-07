import Link from 'next/link'
import { Product } from '@/app/api/products/model'
import styles from './ProductPreview.module.css'

export function ProductPreview({ product }: { product: Product }) {
  const { id, title } = product

  return (
    <Link href={`/shop/product/${id}`} className={styles.card}>
      {title}
    </Link>
  )
}
