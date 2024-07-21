import { create } from 'zustand'
import { getLocalStorage } from '@/helpers'
import { Langs, Translate, translate, TranslationKeys } from '@/langs'

type Lang = {
  lang: Langs
  translate: Translate
  setLang: (lang: Langs) => void
  getLang: () => void
  t: (value: TranslationKeys) => string
  tAPI: (value: string, translations: any) => string
}

export const useTranslation = create<Lang>()((set, get) => ({
  lang: Langs.EN,
  translate,
  setLang: lang =>
    set(() => {
      localStorage.setItem('lang', JSON.stringify(lang))
      return { lang }
    }),
  getLang: () =>
    set(() => {
      const lang =
        typeof getLocalStorage('lang') === 'string'
          ? getLocalStorage('lang')
          : Langs.EN
      return { lang }
    }),
  t: value => {
    const lang = get().lang
    return translate[lang][value]
  },
  tAPI: (value, product) => {
    const lang = get().lang
    const text = value.split('.')

    if (lang === Langs.EN) {
      if (text[0] === 'characteristics') {
        return product.characteristics[text[1]]
      }

      return product[value]
    } else {
      if (text[0] === 'characteristics') {
        return (
          product.translations[lang][text[1]] ||
          product.characteristics[text[1]]
        )
      }

      return product.translations[lang][value] || product[value]
    }
  },
}))
