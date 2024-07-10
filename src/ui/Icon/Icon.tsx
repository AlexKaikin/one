'use client'

import { ComponentProps } from 'react'
import IconArrowDropDown from '@/assets/svg/arrowDropDown.svg'
import IconChevronLeft from '@/assets/svg/chevronLeft.svg'
import IconChevronRight from '@/assets/svg/chevronRight.svg'
import IconClose from '@/assets/svg/close.svg'
import IconFilter from '@/assets/svg/filter.svg'
import IconGalaxy from '@/assets/svg/galaxy.svg'
import IconList from '@/assets/svg/list.svg'
import IconMoon from '@/assets/svg/moon.svg'
import IconPlus from '@/assets/svg/plus.svg'
import IconSearch from '@/assets/svg/search.svg'
import IconSort from '@/assets/svg/sort.svg'
import IconSun from '@/assets/svg/sun.svg'
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
  | 'list'
  | 'arrowDropDown'
  | 'sun'
  | 'moon'
  | 'filter'
  | 'sort'

export function Icon({ name, ...rest }: Props) {
  const icons = {
    galaxy: <IconGalaxy {...rest} />,
    search: <IconSearch {...rest} />,
    plus: <IconPlus {...rest} />,
    trash: <IconTrash {...rest} />,
    close: <IconClose {...rest} />,
    chevronLeft: <IconChevronLeft {...rest} />,
    chevronRight: <IconChevronRight {...rest} />,
    list: <IconList {...rest} />,
    arrowDropDown: <IconArrowDropDown {...rest} />,
    sun: <IconSun {...rest} />,
    moon: <IconMoon {...rest} />,
    filter: <IconFilter {...rest} />,
    sort: <IconSort {...rest} />,
  }
  const icon = icons[name]
  return icon
}
