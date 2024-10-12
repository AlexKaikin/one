'use client'

import { useState } from 'react'
import { useCart, useFavoriteProducts, useCompareProducts, useTranslation } from '@/store'
import { Product } from '@/types'
import { Button, Icon, IconButton, Input, Stack, Typography, useNotify } from '@/ui'
import styles from './Actions.module.css'

export function Actions({ product }: { product: Product }) {
  const { setCart } = useCart()
  const { t } = useTranslation()
  const [quantity, setQuantity] = useState(1)
  const [cost, setCost] = useState(product.price)
  const { notify } = useNotify()
  const { toggleFavorite, favoritesItems } = useFavoriteProducts()
  const { toggleCompare, compareItems } = useCompareProducts()
  const findCompare = compareItems.find(item => item.id === product.id)
  const findFavorite = favoritesItems.find(item => item.id === product.id)
  const [message, setMessage] = useState<string | null>(null)

  function increment() {
    if (product.inStock < quantity + 1) {
      setMessage(`${t('maximum')} ${product.inStock}`)
      return null
    }

    setQuantity(prevQuantity => prevQuantity + 1)
    setCost(prevCost => prevCost + product.price)
  }

  function decriment() {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
      setCost(prevCost => prevCost - product.price)

      if (message) setMessage(null)
    }
  }

  function quantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!Number.isNaN(+e.target.value)) {
      if (+e.target.value > product.inStock || +e.target.value < 1) {
        setQuantity(1)
        setCost(product.price)
      } else {
        setQuantity(+e.target.value)
        setCost(product.price * +e.target.value)
      }
    }
  }

  function addToCart() {
    const { id, imageUrls, title, price, inStock, category } = product
    setCart({ id, imageUrls, title, price, quantity, cost, inStock, category })
    notify({ type: 'info', message: t('addedToCart') })
  }

  function toggleFavoriteProduct() {
    toggleFavorite(product)
    notify({
      type: 'info',
      message: t(findFavorite ? 'excludedFromFavorites' : 'addedToFavorites'),
    })
  }

  function toggleCompareProduct() {
    toggleCompare(product)
    notify({
      type: 'info',
      message: t(findCompare ? 'excludedFromCompare' : 'addedToCompare'),
    })
  }

  if (product.inStock < 1) return null

  return (
    <Stack flexDirection="column" spacing={3}>
      <Stack spacing={2}>
        <Stack flexDirection="column" spacing={1}>
          <div className={styles.quantityTitle}>{t('quantity')}</div>

          <div className={styles.quantityContent}>
            <Input
              type="number"
              onChange={quantityChange}
              value={quantity}
              align="center"
              color="var(--bg)"
              startAdornment={
                <IconButton onClick={decriment} spacing={0.5}>
                  <Icon name="minus" />
                </IconButton>
              }
              endAdornment={
                <IconButton onClick={increment} spacing={0.5}>
                  <Icon name="plus" />
                </IconButton>
              }
              border="2px solid color-mix(in srgb, var(--text), transparent 70%)"
              spacing={0}
            />
          </div>
        </Stack>

        <Stack flexDirection="column" spacing={1}>
          <div className={styles.priceTitle}>{t('cost')}</div>
          <div className={styles.priceNumber}>${cost}</div>
        </Stack>
      </Stack>

      {message && <Typography variant="p">{message}</Typography>}

      <Stack flexDirection="row" spacing={1} justifyContent="flex-start">
        <IconButton color={findCompare ? 'primary' : 'secondary'} onClick={toggleCompareProduct}>
          <Icon name="barChart" width={20} height={20} />
        </IconButton>

        <IconButton color={findFavorite ? 'primary' : 'secondary'} onClick={toggleFavoriteProduct}>
          <Icon name="bookmark" width={20} height={20} />
        </IconButton>

        <Button endIcon={<Icon name="cart" width={20} height={20} />} onClick={addToCart}>
          {t('add')}
        </Button>
      </Stack>
    </Stack>
  )
}
