'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from '@/store'
import { Icon, Select, SelectOption, Stack } from '@/ui'

export function Sorting() {
  const { t } = useTranslation()
  const router = useRouter()

  const searchParams = useSearchParams()

  function getSortActive() {
    const _sort = searchParams.get('_sort')
    const _order = searchParams.get('_order')

    if (_sort === 'price' && _order === 'desc') return t('priceDesc')
    else if (_sort === 'price' && _order === 'asc') return t('priceAsc')
    else if (_sort === 'rating' && _order === 'desc') return t('pop')
    else return t('new')
  }

  const handleChangeSelect = useCallback((item: string) => {
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
  }, [])

  return (
    <Select
      label={
        <Stack alignItems="center">
          <Icon name="sort" />
          {t('sorting')}:
        </Stack>
      }
      defaultSelectValue={getSortActive()}
      onSelectChange={handleChangeSelect}
    >
      <SelectOption value={'new'}>{t('new')}</SelectOption>
      <SelectOption value={'pop'}>{t('pop')}</SelectOption>
      <SelectOption value={'priceAsc'}>{t('priceAsc')}</SelectOption>
      <SelectOption value={'priceDesc'}>{t('priceDesc')}</SelectOption>
    </Select>
  )
}
