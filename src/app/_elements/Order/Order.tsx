'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { Order as OrderType } from '@/app/api/orders/model'
import { TranslationKeys } from '@/langs'
import { useTranslation } from '@/store'
import {
  Input,
  Page,
  PageContent,
  Stack,
  Table,
  TableCell,
  TableRow,
  Widget,
  WidgetGroup,
} from '@/ui'
import styles from './Order.module.css'

export function Order({ order }: { order: OrderType }) {
  const { t } = useTranslation()
  const { status, cartItems, createdAt } = order

  return (
    <Page>
      <PageContent>
        <Stack flexDirection="column" spacing={2}>
          <Table>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>{t('date')}</TableCell>
              <TableCell>{t('status')}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                {dayjs(createdAt).format('YYYYMMDDHHmmssSSS')}
              </TableCell>

              <TableCell>
                {dayjs(new Date(createdAt)).format('H:mm, DD.MM.YYYY')}
              </TableCell>

              <TableCell>{t(status as TranslationKeys)}</TableCell>
            </TableRow>
          </Table>

          <div className={styles.container}>
            <div className={styles.products}>
              {cartItems?.map(product => (
                <div key={product.id} className={styles.product}>
                  <div className={styles.imgContainer}>
                    <Image
                      fill
                      sizes="(max-width: 1800px) 33vw"
                      src={product.imageUrls[0]}
                      alt={product.title}
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.title}>
                    <Link href={`/shop/product/${product.id}`}>
                      {product.title}
                    </Link>
                    <div>
                      {t('price')} ${product.price}
                    </div>
                    <div>
                      {t('quantity')} {product.quantity}
                    </div>
                    <div>
                      {t('cost')} ${product.cost}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <WidgetGroup>
                <Widget title={t('receivingAddress')}>
                  <Stack flexDirection="column" spacing={2}>
                    <Input
                      name="region"
                      value={order.region}
                      label={t('country')}
                      readOnly
                    />
                    <Input
                      name="city"
                      value={order.city}
                      label={t('city')}
                      readOnly
                    />
                    <Input
                      name="street"
                      value={order.street}
                      label={t('street')}
                      readOnly
                    />
                    <Input
                      name="home"
                      value={order.home}
                      label={t('house')}
                      readOnly
                    />
                    <Input
                      value={order.apartment}
                      label={t('apartment')}
                      readOnly
                    />
                    <Input
                      name="index"
                      value={order.index}
                      type="number"
                      label={t('postalCode')}
                      readOnly
                    />
                  </Stack>
                </Widget>
              </WidgetGroup>
            </div>
            <div>
              <WidgetGroup>
                <Widget title={t('recipientDetails')}>
                  <Stack flexDirection="column" spacing={2}>
                    <Input
                      name="surname"
                      value={order.surname}
                      label={t('lastName')}
                      readOnly
                    />
                    <Input
                      name="name"
                      value={order.name}
                      label={t('firstName')}
                      readOnly
                    />
                    <Input
                      name="middleName"
                      value={order.middleName}
                      label={t('middleName')}
                      readOnly
                    />
                  </Stack>
                </Widget>
              </WidgetGroup>
            </div>
          </div>
        </Stack>
      </PageContent>
    </Page>
  )
}
