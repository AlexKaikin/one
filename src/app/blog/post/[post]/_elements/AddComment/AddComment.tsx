'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useTranslation } from '@/store'
import { Post } from '@/types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Icon,
  Typography,
} from '@/ui'
import { CommentForm } from '../CommentForm/CommentForm'


export function AddComment({ post }: { post: Post }) {
  const { data } = useSession()
  const { t } = useTranslation()
  const { id } = post
  const loginLink = `/login?from=blog/post/${id}`
  const registrationLink = `/register?from=blog/post/${id}`

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
        <Typography variant="h3">{t('comments')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data?.user ? (
         <CommentForm postId={id} userId={data.user.id} />
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
