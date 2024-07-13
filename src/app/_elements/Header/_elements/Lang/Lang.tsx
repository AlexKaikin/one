'use client'

import { Langs } from '@/langs'
import { useTranslation } from '@/store'
import { Button } from '@/ui'

export function Lang() {
  const { lang, setLang } = useTranslation()
  const handleToggle = () =>
    lang === 'en' ? setLang(Langs.RU) : setLang(Langs.EN)

  return (
    <Button variant='text' onClick={handleToggle}>
      {lang === 'en' ? 'RU language' : 'EN language'}
    </Button>
  )
}
