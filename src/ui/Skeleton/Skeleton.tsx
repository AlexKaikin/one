import { CSSProperties } from 'react'
import { isNumber } from '@/helpers'
import styles from './Skeleton.module.css'

type Props = {
  height?: number | CSSProperties['height']
  width?: number | CSSProperties['width']
  radius?: number | CSSProperties['width']
}

export function Skeleton(props: Props) {
  const { height = 1, width = '100%', radius = 1 } = props

  return (
    <div
      className={styles.skeleton}
      style={{
        height: isNumber(height) ? `calc(var(--spacing) * ${height})` : height,
        width: isNumber(width) ? `calc(var(--spacing) * ${width})` : width,
        borderRadius: isNumber(radius)
          ? `calc(var(--spacing) * ${radius})`
          : radius,
        backgroundColor: 'color-mix(in srgb, var(--text), transparent 90%)',
      }}
    ></div>
  )
}
