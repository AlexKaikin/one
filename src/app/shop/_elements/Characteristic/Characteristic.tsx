import { Product } from '@/types';
import { TranslationKeys } from '@/langs';
import { useTranslation } from '@/store';
import styles from './Characteristic.module.css';


type Props = {
  value: TranslationKeys
  product: Product
  hideIfNot?: boolean
}

export function Characteristic({ value, product, hideIfNot }: Props) {
  const { t, tAPI } = useTranslation()

  if(hideIfNot && !tAPI(`characteristics.${value}`, product)){
    return null
  }

  return (
    <div className={styles.characteristic}>
      <div>{t(value)}:</div>
      <div className={styles.divider}></div>
      <div>{tAPI(`characteristics.${value}`, product) || '-'}</div>
    </div>
  )
}