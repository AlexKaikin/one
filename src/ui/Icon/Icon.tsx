'use client'

import { ComponentProps } from 'react'
import IconChevronLeft from '@/assets/svg/chevronLeft.svg'
import IconChevronRight from '@/assets/svg/chevronRight.svg'
import IconClose from '@/assets/svg/close.svg'
import IconGalaxy from '@/assets/svg/galaxy.svg'
import IconPlus from '@/assets/svg/plus.svg'
import IconSearch from '@/assets/svg/search.svg'
import IconTrash from '@/assets/svg/trash.svg'

type Props = ComponentProps<'svg'> & { name: IconType }
type IconType =
  | 'galaxy'
  | 'search'
  | 'plus'
  | 'trash'
  | 'close'
  | 'chevronLeft'
  | 'chevronRight'

export function Icon({ name, ...rest }: Props) {
  const icons = {
    galaxy: <IconGalaxy {...rest} />,
    search: <IconSearch {...rest} />,
    plus: <IconPlus {...rest} />,
    trash: <IconTrash {...rest} />,
    close: <IconClose {...rest} />,
    chevronLeft: <IconChevronLeft {...rest} />,
    chevronRight: <IconChevronRight {...rest} />,
  }
  const icon = icons[name]
  return icon
}
