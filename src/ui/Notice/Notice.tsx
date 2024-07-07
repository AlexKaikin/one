'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
import { Icon } from '../Icon/Icon'
import { Color } from '../types'
import styles from './Notice.module.css'

type Props = {
  type?: Color
  children: ReactNode
  onDelete?: () => void
  autoClose?: boolean
}

const timeToDelete = 300
const timeToClose = 5000

export function Notice({
  type = 'info',
  children,
  onDelete = () => {},
  autoClose = true,
}: Props) {
  const [isClosing, setIsClosing] = useState(false)
  const [domNode, setDomNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(onDelete, timeToDelete)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isClosing, onDelete])

  useEffect(() => {
    if (autoClose) {
      const timeoutId = setTimeout(() => setIsClosing(true), timeToClose)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [autoClose])

  useEffect(() => {
    setDomNode(document.getElementById('notifyContaner'))
  }, [])

  return (
    domNode &&
    createPortal(
      <div className={cn([styles.container, { [styles.shrink]: isClosing }])}>
        <div
          className={cn([
            styles.notification,
            styles[type],
            { [styles.slideIn]: !isClosing },
            { [styles.slideOut]: isClosing },
          ])}
        >
          {children}
          <button
            className={styles.closeButton}
            onClick={() => setIsClosing(true)}
          >
            <Icon name="close" height={14} width={14} />
          </button>
        </div>
      </div>,
      domNode
    )
  )
}
