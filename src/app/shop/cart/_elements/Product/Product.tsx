'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart, useTranslation } from '@/store'
import { CartItem } from '@/types'
import { Icon, IconButton, Input, Stack, Typography } from '@/ui'
import styles from './Product.module.css'

export function Product({ product }: { product: CartItem }) {
  const { tAPI } = useTranslation()
  const { id, title, imageUrls, quantity, cost } = product
  const { deleteCartItem, decriment, increment, changeQuantity } = useCart()

  return (
    <div className={styles.product}>
      <div className={styles.header}>
        <div className={styles.imgContainer}>
          <Image fill sizes="(max-width: 1800px) 33vw" src={imageUrls[0]} alt={title} className={styles.img} />
        </div>

        <Stack flexDirection="column" isWide>
          <Link href={`/shop/product/${id}`}>
            <Typography variant="h5" tag="h2">
              {title}
            </Typography>
          </Link>

          <div className={styles.description}>{tAPI('description', product)}</div>
        </Stack>
      </div>

      <div className={styles.content}>
        <div className={styles.quantityContainer}>
          <IconButton variant="text" onClick={() => decriment(id)}>
            <Icon name="minus" height={20} width={20} />
          </IconButton>

          <Input type="number" onChange={e => changeQuantity(id, +e.target.value)} value={quantity} align="center" />

          <IconButton variant="text" onClick={() => increment(id)}>
            <Icon name="plus" height={20} width={20} />
          </IconButton>
        </div>

        <div className={styles.cost}>${cost}</div>

        <div className={styles.delete}>
          <IconButton color="error" onClick={() => deleteCartItem(id)}>
            <Icon name="trash" color="white" height={20} width={20} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
