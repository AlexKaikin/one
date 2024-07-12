import { create } from 'zustand'
import { getLocalStorage } from '@/helpers'
import {
  Langs,
  Translate,
  translate,
  Translation,
  TranslationKeys,
} from '@/langs'

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

    if (lang === Langs.EN) {
      return product[value]
    } else {
      return product.translations[lang][value] || product[value]
    }
  },
}))
