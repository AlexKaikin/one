'use client'

import { ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useOnClickOutside } from '@/hooks'
import styles from './Menu.module.css'

type Props = { trigger: ReactNode; children: ReactNode }

export function Menu({ trigger, children }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<any | null>(null)

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div>
      <div ref={ref} onClick={() => setOpen(!open)} className={styles.trigger}>
        {trigger}
      </div>
      {open &&
        createPortal(
          <div className={styles.menuItems} onClick={() => setOpen(false)}>
            {children}
          </div>,
          ref.current
        )}
    </div>
  )
}

export function MenuItem({ children }: { children: ReactNode }) {
  return <div className={styles.menuItem}>{children}</div>
}
