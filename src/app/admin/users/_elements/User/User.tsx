'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Roles, UserStatuses } from '@/entities'
import { UserService } from '@/services'
import { useTranslation } from '@/store'
import { User as UserType } from '@/types'
import {
  Button,
  Input,
  Page,
  PageContent,
  Select,
  SelectOption,
  useNotify,
} from '@/ui'
import styles from './User.module.css'

export function User({ user }: { user: UserType }) {
  const [status, setStatus] = useState(user.status)
  const [role, setRole] = useState(user.role)
  const { t } = useTranslation()
  const { notify } = useNotify()
  const router = useRouter()
  const isDirty = user.status !== status || user.role !== role

  const handleSubmit = async () => {
    try {
      await UserService.update(user.id, { status, role } as UserType)
      router.refresh()
      notify({ type: 'info', message: t('updated') })
    } catch (error) {
      notify({ type: 'error', message: t('globalError') })
    }
  }

  return (
    <Page>
      <PageContent>
        <div className={styles.form}>
          <Input value={user.email} label={t('email')} readOnly />
          <Input value={user.lastName} label={t('lastName')} readOnly />
          <Input value={user.firstName} label={t('firstName')} readOnly />

          <Select
            label={`${t('role')}: `}
            defaultSelectValue={t(user.role)}
            onSelectChange={setRole}
          >
            <SelectOption value={Roles.admin}>{t(Roles.admin)}</SelectOption>
            <SelectOption value={Roles.user}>{t(Roles.user)}</SelectOption>
          </Select>

          <Select
            label={`${t('status')}: `}
            defaultSelectValue={t(user.status)}
            onSelectChange={setStatus}
          >
            <SelectOption value={UserStatuses.inactive}>
              {t(UserStatuses.inactive)}
            </SelectOption>
            <SelectOption value={UserStatuses.active}>
              {t(UserStatuses.active)}
            </SelectOption>
            <SelectOption value={UserStatuses.blocked}>
              {t(UserStatuses.blocked)}
            </SelectOption>
          </Select>

          <Button disabled={!isDirty} onClick={handleSubmit}>
            {t('save')}
          </Button>
        </div>
      </PageContent>
    </Page>
  )
}
