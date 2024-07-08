import styles from './Header.module.css'
import { Logo, Navigation, Search } from './_elements'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Navigation />
        <Logo />
        <Search />
      </div>
    </header>
  )
}
