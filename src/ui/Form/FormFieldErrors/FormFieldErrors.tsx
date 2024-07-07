import { FieldError } from 'react-hook-form'
import styles from './FormFieldErrors.module.css'

type Props = {
  error: FieldError
}

export function FormFieldErrors({ error }: Props) {
  return <p className={styles.message}>{error?.message}</p>
}
