'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Product } from '@/app/api/products/model'
import { useTranslation } from '@/store'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Icon,
  Typography,
} from '@/ui'
import { ReviewForm } from '../ReviewForm/ReviewForm'

export function AddReview({ product }: { product: Product }) {
  const { data } = useSession()
  const { t } = useTranslation()
  const { id, category } = product
  const loginLink = `/login?from=shop/${category?.toLowerCase()}/${id}`
  const registrationLink = `/register?from=shop/${category?.toLowerCase()}/${id}`

  return (
    <Accordion shadow={false}>
      <AccordionSummary
        id={`panel-header`}
        aria-controls={`panel-content`}
        expandIcon={
          <Button
            color="primary"
            startIcon={<Icon name="plus" height={20} width={20} />}
          >
            {t('add')}
          </Button>
        }
      >
        <Typography variant="h3">{t('reviews')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data?.user ? (
          <ReviewForm productId={id} userId={data.user.id} />
        ) : (
          <div>
            {t('onlyAuthorized')}.{' '}
            <Link href={loginLink} style={{ color: 'var(--primary)' }}>
              {t('login')}
            </Link>{' '}
            |{' '}
            <Link href={registrationLink} style={{ color: 'var(--primary)' }}>
              {t('registration')}
            </Link>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
