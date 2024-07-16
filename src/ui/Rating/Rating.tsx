'use client'

import { ComponentProps } from 'react'
import { Icon } from '@/ui'
import styles from './Rating.module.css'

type Props = ComponentProps<'svg'> & {
  value: number
  size?: number
}

export function Rating({ value }: Props) {
  let ratingStarFill: string[] = []
  let ratingStar: string[] = []

  if (value > 0) {
    ratingStarFill = Array(value).fill('ratingStarFill')
    if (value < 5) ratingStar = Array(5 - value).fill('ratingStar')
  }

  return (
    <div className={styles.rating}>
      {ratingStarFill.length > 0 &&
        ratingStarFill.map((_, i) => (
          <Icon name="star" key={i} height={20} width={20} />
        ))}
      {ratingStar.length > 0 &&
        ratingStar.map((_, i) => (
          <Icon name="starOutline" key={i} height={20} width={20} />
        ))}
    </div>
  )
}
