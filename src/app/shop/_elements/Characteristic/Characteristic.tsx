import { Product } from '@/app/api/products/model'
import { TranslationKeys } from '@/langs'
import { useTranslation } from '@/store'
import styles from './Characteristic.module.css'

type Props = {
  value: TranslationKeys
  product: Product
}

export function Characteristic({ value, product }: Props) {
  const { t, tAPI } = useTranslation()

  return (
    <div className={styles.characteristic}>
      <div>{t(value)}:</div>
      <div className={styles.divider}></div>
      <div>{tAPI(`characteristics.${value}`, product) || '-'}</div>
    </div>
  )
}
