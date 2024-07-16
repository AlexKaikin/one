'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import imgUrl from '@/assets/images/home/friends-posing-party.jpg'
import { useTranslation } from '@/store'
import { Button, Page, PageContent, PageHeader, Stack, Typography } from '@/ui'
import styles from './page.module.css'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const { status } = useSession()

  return (
    <Page>
      <PageContent className={styles.container}>
        <div className={styles.col}>
          <Stack isWide flexDirection="column" justifyContent="center" spacing={2}>
            <Typography variant="h1">{t('homeTitle')}</Typography>
            <Typography variant="p">{t('homeDescription')}</Typography>

            {status === 'unauthenticated' && (
              <Stack flexDirection="row" spacing={1}>
                <Button onClick={() => router.push('/register')}>
                  {t('registration')}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => router.push('/login')}
                >
                  {t('login')}
                </Button>
              </Stack>
            )}
          </Stack>

          <Stack isWide className={styles.imgContainer}>
            <Image
              src={imgUrl}
              className={styles.img}
              alt="community"
              sizes="(max-width: 1800px) 50vw"
              fill
            />
          </Stack>
        </div>
      </PageContent>
    </Page>
  )
}
