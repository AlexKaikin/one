'use client'

import Link from 'next/link'
import { Langs } from '@/langs'
import { useTranslation } from '@/store'

export function Lang() {
  const { lang, setLang } = useTranslation()
  const handleToggle = () =>
    lang === 'en' ? setLang(Langs.RU) : setLang(Langs.EN)

  return (
    <Link href="#" onClick={handleToggle}>
      {lang === 'en' ? 'RU lang' : 'EN lang'}
    </Link>
  )
}
