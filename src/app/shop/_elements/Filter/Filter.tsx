'use client'

import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { useTranslation } from '@/store'
import {
  Button,
  Icon,
  IconButton,
  Stack,
  Form,
  FormInput,
  FormCheckbox,
  WidgetGroup,
  Widget,
  Rating,
} from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './Filter.module.css'
import { uuid } from '@/helpers'

const schema = z.object({
  search: z.string(),
  manufacturer: z.string(),
  price_gte: z.string().refine(
    val => {
      if (val.length) return +val > 0
      return true
    },
    { message: 'min 1' }
  ),
  price_lte: z.string().refine(
    val => {
      if (val.length) return +val < 10000
      return true
    },
    { message: 'max 10000' }
  ),
  ratings: z.string(),
})

const clearValues = {
  search: '',
  manufacturer: '',
  price_gte: '',
  price_lte: '',
  ratings: '',
}

type FilterDto = {
  search: string
  manufacturer: string
  price_gte: string
  price_lte: string
  ratings: string
}

export function Filter() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [ratings, setRatings] = useState<number[]>(
    searchParams
      .get('ratings')
      ?.split(',')
      .map(item => +item) || []
  )

  const defaultValues = useMemo(
    () => ({
      search: searchParams.get('search') || '',
      manufacturer: searchParams.get('manufacturer') || '',
      price_gte: searchParams.get('price_gte') || '',
      price_lte: searchParams.get('price_lte') || '',
      ratings: searchParams.get('ratings') || '',
    }),
    [searchParams]
  )

  const formMethods = useForm<FilterDto>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const { reset, setValue, formState } = formMethods
  const { isDirty } = formState

  function formReset() {
    let param: keyof typeof defaultValues

    for (param in defaultValues) {
      defaultValues[param] = ''
    }

    reset(clearValues)

    setRatings([])
    router.push(pathname)
    router.refresh()
  }

  function handleRating(star: number) {
    if (ratings.includes(star)) {
      const value = [...ratings.filter(item => item !== star)]
      setValue('ratings', value.join(','), { shouldDirty: true })
      setRatings(value)
    } else {
      const value = [...ratings, star]
      setValue('ratings', value.join(','), { shouldDirty: true })
      setRatings(value)
    }
  }

  const handleSubmit = async (data: FilterDto) => {
    data.ratings = ratings.join(',')
    let queryParams

    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)
      let param: keyof typeof data

      for (param in data) {
        if (data[param].length) {
          if (queryParams.has(param)) {
            queryParams.set(param, data[param])
          } else {
            queryParams.append(param, data[param])
          }

          if (queryParams.has('_page')) {
            queryParams.set('_page', String(1))
          }
        } else {
          if (queryParams.has(param)) {
            queryParams.delete(param)
          }
        }
      }
    }

    const path = '/shop' + '?' + queryParams?.toString()
    router.push(path)
    reset(data)
  }

  return (
    <div>
      <Stack>
        <Button
          variant="clean"
          startIcon={<Icon name="filter" width={20} height={20} />}
          onClick={() => setOpen(!open)}
        >
          {t('filter')}
        </Button>
      </Stack>

      {open &&
        createPortal(
          <div className={styles.filter}>
            <div className={styles.filterHeader}>
              <div>{t('filter')}</div>

              <div>
                <IconButton variant="text" onClick={() => setOpen(false)}>
                  <Icon name="close" height={25} width={25} />
                </IconButton>
              </div>
            </div>

            <div className={styles.filterContent}>
              <Form
                id="searchForm"
                formMethods={formMethods}
                onSubmit={handleSubmit}
              >
                <WidgetGroup>
                  <Widget title={t('price')}>
                    <Stack
                      flexDirection="row"
                      alignItems="flex-start"
                      flexWrap="nowrap"
                      spacing={1}
                    >
                      <FormInput
                        type="number"
                        name="price_gte"
                        placeholder="0"
                        label={t('from')}
                        startAdornment={'$'}
                      />

                      <div>
                        <label>&nbsp;</label>
                        <div>-</div>
                      </div>

                      <FormInput
                        type="number"
                        name="price_lte"
                        placeholder="10000"
                        label={t('to')}
                        startAdornment={'$'}
                      />
                    </Stack>
                  </Widget>

                  <Widget title={t('rating')}>
                    <Stack flexDirection="column">
                      <FormInput type="hidden" name="ratings" />
                      {[5, 4, 3, 2, 1].map(item => (
                        <Stack
                          key={item}
                          flexDirection="row"
                          alignItems="center"
                          spacing={2}
                        >
                          <FormCheckbox
                            checked={ratings.includes(item)}
                            onChange={() => handleRating(item)}
                            label={<Rating value={item} />}
                          />
                        </Stack>
                      ))}
                    </Stack>
                  </Widget>

                  <Widget>
                    <FormInput
                      name="search"
                      placeholder="shen"
                      label={t('title')}
                    />
                  </Widget>

                  <Widget>
                    <FormInput
                      name="manufacturer"
                      placeholder="tialend"
                      label={t('manufacturer')}
                    />
                  </Widget>

                  <Widget>
                    <Stack spacing={1} className={styles.control}>
                      <Button disabled={!isDirty} type="submit" isFullWidth>
                        {t('apply')}
                      </Button>

                      <Button
                        type="button"
                        onClick={formReset}
                        variant="outlined"
                        isFullWidth
                      >
                        {t('reset')}
                      </Button>
                    </Stack>
                  </Widget>
                </WidgetGroup>
              </Form>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
