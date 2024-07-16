'use client'

import { useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { Stack } from '@/ui'
import styles from './Slider.module.css'

export function Slider({ imageUrls }: { imageUrls: string[] }) {
  const [activeUrl, setActiveUrl] = useState(imageUrls[0])

  return (
    <div className={styles.slider}>
      <div className={styles.previews}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className={cn(styles.previewContainer, {
              [styles['active']]: activeUrl === url,
            })}
            onClick={() => setActiveUrl(url)}
          >
            <Image
              fill
              sizes="(max-width: 1800px) 50vw"
              src={url}
              alt={`Product image ${index + 1}`}
              className={styles.img}
            />
          </div>
        ))}
      </div>

      <Stack isWide justifyContent="center">
        <div className={styles.imgContainer}>
          <Image
            fill
            sizes="(max-width: 1800px) 50vw"
            src={activeUrl}
            alt={`Product image`}
            className={styles.img}
          />
        </div>
      </Stack>
    </div>
  )
}
