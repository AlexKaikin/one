'use client'

import { Langs } from '@/langs'
import { useTranslation } from '@/store'
import { Button } from '@/ui'
import styles from './Lang.module.css'

export function Lang() {
  const { lang, setLang } = useTranslation()
  const handleToggle = () =>
    lang === 'en' ? setLang(Langs.RU) : setLang(Langs.EN)

  return (
    <Button onClick={handleToggle} className={styles.button}>
      {lang === 'en' ? 'RU language' : 'EN language'}
    </Button>
  )
}
