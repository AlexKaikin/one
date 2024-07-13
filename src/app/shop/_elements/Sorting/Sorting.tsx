'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from '@/store'
import { Button, Icon, Menu, MenuItem } from '@/ui'

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

  function changeSortActive(item: string) {
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
      _sort = 'id'
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
  }

  return (
    <Menu
      trigger={
        <Button variant="text" startIcon={<Icon name="sort" />}>
          {t('sorting')}: {getSortActive()}
        </Button>
      }
    >
      <MenuItem>
        <Button variant="text" onClick={() => changeSortActive('new')}>
          {t('new')}
        </Button>
      </MenuItem>

      <MenuItem>
        <Button variant="text" onClick={() => changeSortActive('pop')}>
          {t('pop')}
        </Button>
      </MenuItem>

      <MenuItem>
        <Button variant="text" onClick={() => changeSortActive('priceAsc')}>
          {t('priceAsc')}
        </Button>
      </MenuItem>

      <MenuItem>
        <Button variant="text" onClick={() => changeSortActive('priceDesc')}>
          {t('priceDesc')}
        </Button>
      </MenuItem>
    </Menu>
  )
}
