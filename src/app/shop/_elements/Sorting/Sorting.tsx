'use client'

import { useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TranslationKeys } from '@/langs'
import { useTranslation } from '@/store'
import { Icon, Select, SelectOption, Stack } from '@/ui'

export function Sorting() {
  const searchParams = useSearchParams()
  const { t } = useTranslation()
  const router = useRouter()

  function getSortActive() {
    const _sort = searchParams.get('_sort')
    const _order = searchParams.get('_order')

    if (_sort === 'price' && _order === 'desc') return 'priceDesc'
    else if (_sort === 'price' && _order === 'asc') return 'priceAsc'
    else if (_sort === 'rating' && _order === 'desc') return 'pop'
    else return 'new'
  }

  const handleChangeSelect = useCallback(
    (item: TranslationKeys) => {
      let queryParams
      let _sort = ''
      let _order = ''

      if (item === 'priceDesc') {
        _sort = 'price'
        _order = 'desc'
      } else if (item === 'priceAsc') {
        _sort = 'price'
        _order = 'asc'
      } else if (item === 'pop') {
        _sort = 'rating'
        _order = 'desc'
      } else {
        _sort = 'createdAt'
        _order = 'desc'
      }

      if (typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search)

        if (queryParams.has('_sort')) {
          queryParams.set('_sort', _sort)
          queryParams.set('_order', _order)
        } else {
          queryParams.append('_sort', _sort)
          queryParams.append('_order', _order)
        }

        if (queryParams.has('_page')) {
          queryParams.set('_page', String(1))
        }
      }
      const path = window.location.pathname + '?' + queryParams?.toString()

      router.push(path)
    },
    [router]
  )

  return (
    <Select
      label={
        <Stack alignItems="center" spacing={0.5}>
          <Icon name="sort" height={20} width={20} />
          {t('sorting')}:
        </Stack>
      }
      defaultSelectValue={t(getSortActive())}
      onSelectChange={handleChangeSelect}
    >
      <SelectOption value={'new'}>{t('new')}</SelectOption>
      <SelectOption value={'pop'}>{t('pop')}</SelectOption>
      <SelectOption value={'priceAsc'}>{t('priceAsc')}</SelectOption>
      <SelectOption value={'priceDesc'}>{t('priceDesc')}</SelectOption>
    </Select>
  )
}
