'use client'

import { createPortal } from 'react-dom'
import { Icon } from '../Icon/Icon'
import styles from './ImageLoader.module.css'

export function ImageLoader({ loading }: { loading: boolean }) {
  return (
    <>
      {loading &&
        createPortal(
          <div className={styles.loader}>
            <Icon
              name="loading"
              height={150}
              width={150}
              color="var(--primary)"
            />
          </div>,
          document.body
        )}
    </>
  )
}
