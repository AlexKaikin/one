'use client'

import { useForm } from 'react-hook-form'
import cn from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { getLocalStorage } from '@/helpers'
import { OrderService } from '@/services'
import { useCart, useTranslation } from '@/store'
import { CreateOrder } from '@/types'
import {
  Button,
  Form,
  FormInput,
  Icon,
  Page,
  PageContent,
  Stack,
  useNotify,
  Widget,
  WidgetGroup,
} from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from './_elements'
import styles from './page.module.css'

function getSchema(t: Function) {
  const required_error = t('required')
  const message = required_error

  const schema = z.object({
    region: z.string({ required_error }).min(1, { message }),
    city: z.string({ required_error }).min(1, { message }),
    street: z.string({ required_error }).min(1, { message }),
    home: z.string({ required_error }).min(1, { message }),
    index: z.coerce.number({ required_error }).min(1, { message }),
    name: z.string({ required_error }).min(1, { message }),
    surname: z.string({ required_error }).min(1, { message }),
    middleName: z.string({ required_error }).min(1, { message }),
    user: z.string().optional(),
  })

  return schema
}

export default function CartPage() {
  const { notify } = useNotify()
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { cartItems, totalCost } = useCart()
  const router = useRouter()

  const formMethods = useForm<CreateOrder>({
    resolver: zodResolver(getSchema(t)),
  })

  const handleSubmit = async (data: CreateOrder) => {
    try {
      data.cartItems = getLocalStorage('cart') || []
      data.totalCost = totalCost
      data.status = 'awaitingPayment'
      data.user = session?.user.id || ''
      await OrderService.create(data)
      router.push('/account/orders')
      router.refresh()
    } catch (error) {
      notify({ type: 'error', message: t('globalError') })
    }
  }

  return (
    <Page>
      <PageContent>
        <div className={styles.container}>
          <div className={styles.products}>
            {cartItems?.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          <div>
            <Form
              id="orderForm"
              formMethods={formMethods}
              onSubmit={handleSubmit}
              className={styles.form}
            >
              <Stack flexDirection="column">
                {!session?.user && (
                  <div className={styles.notification}>
                    <Icon name="exclamation" />
                    <Stack flexWrap="wrap" spacing={1}>
                      {t('onlyAuthorized')}.
                      <Link href={'/register?from=shop/cart'}>
                        {t('registration')}
                      </Link>{' '}
                      |<Link href={'/login?from=shop/cart'}>{t('login')}</Link>
                    </Stack>
                  </div>
                )}
                <Stack flexDirection="row" flexWrap="wrap" spacing={1}>
                  <WidgetGroup
                    className={cn(styles.widget, {
                      [styles['disable']]: !session?.user,
                    })}
                  >
                    <Widget title={t('receivingAddress')}>
                      <Stack flexDirection="column" spacing={2}>
                        <FormInput
                          name="region"
                          label={t('country')}
                          disabled={!session?.user}
                        />
                        <FormInput
                          name="city"
                          label={t('city')}
                          disabled={!session?.user}
                        />
                        <FormInput
                          name="street"
                          label={t('street')}
                          disabled={!session?.user}
                        />
                        <FormInput
                          name="home"
                          label={t('house')}
                          disabled={!session?.user}
                        />
                        <FormInput
                          label={t('apartment')}
                          disabled={!session?.user}
                        />
                        <FormInput
                          name="index"
                          type="number"
                          label={t('postalCode')}
                          disabled={!session?.user}
                        />
                      </Stack>
                    </Widget>
                  </WidgetGroup>

                  <div
                    className={cn(styles.widget, {
                      [styles['disable']]: !session?.user,
                    })}
                  >
                    <WidgetGroup>
                      <Widget title={t('recipientDetails')}>
                        <Stack flexDirection="column" spacing={2}>
                          <FormInput
                            name="surname"
                            label={t('lastName')}
                            disabled={!session?.user}
                          />
                          <FormInput
                            name="name"
                            label={t('firstName')}
                            disabled={!session?.user}
                          />
                          <FormInput
                            name="middleName"
                            label={t('middleName')}
                            disabled={!session?.user}
                          />
                        </Stack>
                      </Widget>

                      <Widget title={t('summery')}>
                        <Stack
                          flexDirection="column"
                          spacing={2}
                          className={cn(styles.widget)}
                        >
                          <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <div>{t('total')}</div>{' '}
                            <span className={styles.divider}></span>{' '}
                            <div>{cartItems.length}</div>
                          </Stack>

                          <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <div>{t('discount')}</div>{' '}
                            <span className={styles.divider}></span>{' '}
                            <div>0%</div>
                          </Stack>

                          <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <div>{t('amount')}</div>{' '}
                            <span className={styles.divider}></span>{' '}
                            <div>${totalCost}</div>
                          </Stack>

                          <br />

                          <Stack
                            flexDirection="row"
                            alignItems="flex-end"
                            spacing={1}
                          >
                            <FormInput label={t('coupon')} />
                            <Button type="button">{t('apply')}</Button>
                          </Stack>

                          <Button isFullWidth type="submit">
                            {t('checkout')}
                          </Button>
                        </Stack>
                      </Widget>
                    </WidgetGroup>
                  </div>
                </Stack>
              </Stack>
            </Form>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
