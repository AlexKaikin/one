'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import { PROFILE_TYPES } from '@/constants'
import { Note } from '@/types'
import { Button, Icon, Input } from '@/ui'
import { DeleteNoteButton } from '../DeleteNoteButton/DeleteNoteButton'
import styles from './Notes.module.css'

export function Notes({ notes }: { notes: Note[] }) {
  return (
    <div className={styles.notes}>
      {notes.map(({ profile, id, text, createdAt }, index) => (
        <div key={id}>
          {!isTodayEqualYesterday(notes, index) && (
            <div className={styles.date}>
              {dayjs(createdAt).format('D MMMM YYYY')}
            </div>
          )}
          <div className={styles.note}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                <Image
                  fill
                  sizes="(max-width: 1800px) 33vw"
                  src={profile.avatarUrl}
                  alt="avatar"
                  className={styles.img}
                />
              </div>
              <div className={styles.headerInfo}>
                <div className={styles.name}>
                  {profile.type === PROFILE_TYPES.USER
                    ? `${profile.user.firstName} ${profile.user.lastName}`
                    : profile.companyName}
                </div>
                <div className={styles.time}>
                  {dayjs(createdAt).format('H:mm')}
                </div>
              </div>

              <DeleteNoteButton id={id} profile={profile} />
            </div>
            <div className={styles.content}>
              <div>
                {text.split('\n').map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
            <div className={styles.actions}>
              <Button variant="text" className={styles.like}>
                <Icon name="handThumbsUp" width={16} height={16} />
              </Button>
              <Input placeholder="Write a comment" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function isTodayEqualYesterday(notes: Note[], noteIndex: number) {
  if (noteIndex === 0) {
    return false
  } else {
    return (
      dayjs(notes[noteIndex].createdAt).format('D MMMM YYYY') ===
      dayjs(notes[noteIndex - 1].createdAt).format('D MMMM YYYY')
    )
  }
}
