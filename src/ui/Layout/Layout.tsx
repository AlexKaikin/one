import { ComponentProps, ReactNode } from 'react'
import styles from './Layout.module.css'

type Props = ComponentProps<'div'> & { children: ReactNode }

export function Layout({ children, ...rest }: Props) {
  return (
    <div className={styles.layout} {...rest}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export function Container({ children, ...rest }: { children: ReactNode }) {
  return (
    <div className={styles.container} {...rest}>
      {children}
    </div>
  )
}

export function Page({ children, ...rest }: { children: ReactNode }) {
  return (
    <main className={styles.main} {...rest}>
      {children}
    </main>
  )
}

export function PageHeader({ children, ...rest }: Props) {
  return (
    <div className={styles.header} {...rest}>
      {children}
    </div>
  )
}

export function PageContent({ children, ...rest }: Props) {
  return (
    <div className={styles.content} {...rest}>
      {children}
    </div>
  )
}

export function Aside({ children }: Props) {
  return <aside className={styles.aside}>{children}</aside>
}
