'use client'

import Link from 'next/link'
import { Product } from '@/app/api/products/model'
import { useTranslation } from '@/store'
import { List } from '@/ui'

export function Products({ products }: { products: Product[] }) {
  const { tAPI } = useTranslation()

  return (
    <List spacing={2}>
      {products.map(product => (
        <Link key={product.id} href={`/admin/products/${product.id}`}>
          {tAPI('title', product)}
        </Link>
      ))}
    </List>
  )
}
