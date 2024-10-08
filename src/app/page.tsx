'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import imgUrl from '@/assets/images/home/friends-posing-party.jpg'
import { useTranslation } from '@/store'
import { Button, Page, PageContent, Stack, Typography } from '@/ui'
import { Footer } from './_elements'
import styles from './page.module.css'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const { status } = useSession()

  return (
    <Stack flexDirection="column">
      <Page>
        <PageContent className={styles.container}>
          <div className={styles.col}>
            <Stack isWide flexDirection="column" justifyContent="center" spacing={2}>
              <Stack flexDirection='column'>
                <Typography variant="h1">{t('homeTitle')}</Typography>
                <Typography variant="p" italic>
                  {t('homeSubTitle')}
                </Typography>
              </Stack>

              <Typography variant="p">{t('homeDescription')}</Typography>

              {status === 'unauthenticated' && (
                <Stack flexDirection="row" spacing={1}>
                  <Button onClick={() => router.push('/register')}>{t('registration')}</Button>

                  <Button variant="outlined" onClick={() => router.push('/login')}>
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
                priority
              />
            </Stack>
          </div>
        </PageContent>
      </Page>

      <Footer />
    </Stack>
  )
}
