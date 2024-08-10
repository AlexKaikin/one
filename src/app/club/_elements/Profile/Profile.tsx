'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import defaultAvatar from '@/assets/images/user/defaultAvatar.png'
import { User } from '@/types'
import { Button, Icon, Page, PageContent, Spoiler, Stack } from '@/ui'
import { CreatePost } from '../CreatePost/CreatePost'
import { Following } from '../Following/Following'
import styles from './Profile.module.css'

export function Profile({ user }: { user: User }) {
  const router = useRouter()
  const { data } = useSession()
  const isMyProfile = user.id === data?.user.id
  const isFollower = user?.followers?.find(({ id }) => id === data?.user.id)
  const isFollowing = user?.following?.find(({ id }) => id === data?.user.id)

  //if (user && user.id === data?.user.id) router.push('/club')

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
                    src={user.avatarUrl || defaultAvatar}
                    alt="avatar"
                    priority
                    className={styles.img}
                  />
                </div>

                <div className={styles.info}>
                  <div className={styles.nicname}>
                    {data?.user.firstName} {data?.user.lastName}
                  </div>

                  <div className={styles.actions}>
                    {!isMyProfile && user && isFollower && (
                      <Button
                        variant="outlined"
                        size="small"
                        //  onClick={() => unFollow(user!)}
                      >
                        unfollow
                      </Button>
                    )}

                    {!isMyProfile && user && !isFollower && (
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
                          router.push(`/club/messenger/${user?.id}`)
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
                      onClick={() => router.push('/club/profile-settings')}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
              <div className={styles.about}>
                <Spoiler
                  hideShadow
                  maxHeight={50}
                  hideLabel="Hide"
                  showLabel="More"
                  labelSize="small"
                  color="secondary"
                >
                  <div className={styles.more}>
                    {!!user?.about?.length && (
                      <Stack flexDirection="column" spacing={1}>
                        <span className={styles.infoTitle}>About</span>

                        <div>
                          {user.about.split('\n').map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                        </div>
                      </Stack>
                    )}

                    {!!user?.interests?.length && (
                      <Stack flexDirection="column" spacing={1}>
                        <span className={styles.infoTitle}>Interests</span>

                        <div>{user.interests.join(', ')}</div>
                      </Stack>
                    )}

                    {!!user?.location?.length && (
                      <Stack flexDirection="column" spacing={1}>
                        <span className={styles.infoTitle}>Location</span>

                        <Stack alignItems="center" spacing={1}>
                          <Icon name="mapPin" width={16} height={16} />{' '}
                          {user.location}
                        </Stack>
                      </Stack>
                    )}
                  </div>
                </Spoiler>

                <Following user={user} />
              </div>
            </div>

            <CreatePost />
          </div>
        </Stack>
      </PageContent>
    </Page>
  )
}
