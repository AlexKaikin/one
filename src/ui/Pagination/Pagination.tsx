'use client'

import cn from 'classnames'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon, IconButton } from '@/ui'
import styles from './Pagination.module.css'

export function Pagination({ totalCount }: { totalCount: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const queryParams = new URLSearchParams(searchParams)
  const currentPage = Number(searchParams.get('page') || 1)
  const limitItems = Number(searchParams.get('limit') || 10)
  const pagesCount = Math.ceil(+totalCount / limitItems)
  const pages: number[] = createPages(pagesCount, currentPage)
  const prevPage = currentPage > 1 ? currentPage - 1 : 1
  const nextPage = currentPage < pages.length ? currentPage + 1 : pages.length

  function changePage(number: number) {
    queryParams.set('page', String(number))
    queryParams.set('limit', String(limitItems))

    const path = `${pathname}?${queryParams?.toString()}`
    router.push(path)
  }

  if (pages.length < 2) return null

  return (
    <div className={styles.pagination}>
      <IconButton
        onClick={() => changePage(prevPage)}
        disabled={currentPage === 1}
      >
        <Icon name="chevronLeft" />
      </IconButton>

      {pages?.map(page => (
        <button
          key={page}
          onClick={() => currentPage !== page && changePage(page)}
          className={cn(styles.page, { [styles.active]: currentPage === page })}
        >
          {page}
        </button>
      ))}

      <IconButton
        onClick={() => changePage(nextPage)}
        disabled={currentPage === pagesCount}
      >
        <Icon name="chevronRight" />
      </IconButton>
    </div>
  )
}

function createPages(pagesCount: number, currentPage: number) {
  const pages = []
  if (pagesCount > 5) {
    if (currentPage > 4) {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i)
        if (i === pagesCount) break
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
        if (i === pagesCount) break
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
  }

  return pages
}
