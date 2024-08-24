'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import defaultAvatar from '@/assets/images/user/defaultAvatar.png'
import { PROFILE_TYPES } from '@/constants'
import { useTranslation } from '@/store'
import { Profile as ProfileType } from '@/types'
import { Button, Icon, Page, PageContent, Spoiler, Stack } from '@/ui'
import { CreatePost } from '../CreatePost/CreatePost'
import { Following } from '../Following/Following'
import styles from './Profile.module.css'

export function Profile({ profile }: { profile: ProfileType }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { data } = useSession()
  const isMyProfile = profile.user.id === data?.user.id
  const isFollower = profile.followers?.find(({ id }) => id === data?.user.id)
  const isFollowing = profile.following?.find(({ id }) => id === data?.user.id)

  return (
    <Page>
      <PageContent>
        <Stack justifyContent="center">
          <div className={styles.container}>
            <div className={styles.profile}>
              <div className={styles.basic}>
                <div className={styles.avatar}>
                  <Image
                    fill
                    sizes="(max-width: 1800px) 50vw"
                    src={profile.avatarUrl || defaultAvatar}
                    alt="avatar"
                    priority
                    className={styles.img}
                  />
                </div>

                <div className={styles.info}>
                  <div className={styles.nicname}>
                    {profile.type === PROFILE_TYPES.USER ? (
                      <>
                        {' '}
                        {profile.user.firstName} {profile.user.lastName}
                      </>
                    ) : (
                      profile.companyName
                    )}
                  </div>

                  <div className={styles.actions}>
                    {!isMyProfile && profile && isFollower && (
                      <Button
                        variant="outlined"
                        size="small"
                        //  onClick={() => unFollow(user!)}
                      >
                        unfollow
                      </Button>
                    )}

                    {!isMyProfile && profile && !isFollower && (
                      <Button
                        size="small"
                        // onClick={() => follow(user!)}
                      >
                        follow
                      </Button>
                    )}

                    {!isMyProfile && isFollower && isFollowing && (
                      <Button
                        color="primary"
                        size="small"
                        onClick={() =>
                          router.push(`/club/messenger/${profile.id}`)
                        }
                      >
                        <Icon name="message" width={14} height={14} />
                      </Button>
                    )}
                  </div>

                  {isMyProfile && (
                    <Button
                      size="small"
                      startIcon={
                        <Icon
                          name="filePen"
                          color="white"
                          width={16}
                          height={16}
                        />
                      }
                      onClick={() =>
                        router.push(`/club/profile-settings/${profile.id}`)
                      }
                    >
                      {t('edit')}
                    </Button>
                  )}
                </div>
              </div>
              <div className={styles.about}>
                <Spoiler
                  hideShadow
                  maxHeight={55}
                  hideLabel={t('hide')}
                  showLabel={t('more')}
                  labelSize="small"
                  color="secondary"
                >
                  <div className={styles.more}>
                    {!!profile.about?.length && (
                      <Stack flexDirection="column" spacing={1}>
                        <span className={styles.infoTitle}>{t('aboutMe')}</span>

                        <div>
                          {profile.about.split('\n').map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                        </div>
                      </Stack>
                    )}

                    {!!profile.interests?.length && (
                      <Stack flexDirection="column" spacing={1}>
                        <span className={styles.infoTitle}>
                          {t('interests')}
                        </span>

                        <div>{profile.interests}</div>
                      </Stack>
                    )}

                    {!!profile.location?.length && (
                      <Stack flexDirection="column" spacing={1}>
                        <span className={styles.infoTitle}>
                          {t('location')}
                        </span>

                        <Stack alignItems="center" spacing={1}>
                          <Icon name="mapPin" width={16} height={16} />{' '}
                          {profile.location}
                        </Stack>
                      </Stack>
                    )}
                  </div>
                </Spoiler>

                {/* <Following user={user} /> */}
              </div>
            </div>

          <CreatePost profile={profile} />
          </div>
        </Stack>
      </PageContent>
    </Page>
  )
}
