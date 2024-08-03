'use client'

import { ComponentProps } from 'react'
import IconApps from '@/assets/svg/apps.svg'
import IconArrowDropDown from '@/assets/svg/arrowDropDown.svg'
import IconBarChart from '@/assets/svg/barChart.svg'
import IconBookmark from '@/assets/svg/bookmark.svg'
import IconBookmarks from '@/assets/svg/bookmarks.svg'
import IconCalendar from '@/assets/svg/calendar.svg'
import IconCart from '@/assets/svg/cart.svg'
import IconChevronLeft from '@/assets/svg/chevronLeft.svg'
import IconChevronRight from '@/assets/svg/chevronRight.svg'
import IconClose from '@/assets/svg/close.svg'
import IconExclamation from '@/assets/svg/exclamation.svg'
import IconEye from '@/assets/svg/eye.svg'
import IconFilter from '@/assets/svg/filter.svg'
import IconFolder from '@/assets/svg/folder.svg'
import IconGalaxy from '@/assets/svg/galaxy.svg'
import IconHeart from '@/assets/svg/heart.svg'
import IconList from '@/assets/svg/list.svg'
import IconListCheck from '@/assets/svg/listCheck.svg'
import IconLoading from '@/assets/svg/loading.svg'
import IconLogo from '@/assets/svg/logo.svg'
import IconMinus from '@/assets/svg/minus.svg'
import IconMoon from '@/assets/svg/moon.svg'
import IconPlus from '@/assets/svg/plus.svg'
import IconSearch from '@/assets/svg/search.svg'
import IconSort from '@/assets/svg/sort.svg'
import IconStar from '@/assets/svg/star.svg'
import IconStarOutline from '@/assets/svg/starOutline.svg'
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
  | 'loading'
  | 'barChart'
  | 'bookmark'
  | 'bookmarks'
  | 'heart'
  | 'cart'
  | 'apps'
  | 'listCheck'
  | 'logo'
  | 'minus'
  | 'starOutline'
  | 'star'
  | 'exclamation'
  | 'eye'
  | 'folder'
  | 'calendar'

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
    loading: <IconLoading {...rest} />,
    barChart: <IconBarChart {...rest} />,
    bookmark: <IconBookmark {...rest} />,
    bookmarks: <IconBookmarks {...rest} />,
    heart: <IconHeart {...rest} />,
    cart: <IconCart {...rest} />,
    apps: <IconApps {...rest} />,
    listCheck: <IconListCheck {...rest} />,
    logo: <IconLogo {...rest} />,
    minus: <IconMinus {...rest} />,
    starOutline: <IconStarOutline {...rest} />,
    star: <IconStar {...rest} />,
    exclamation: <IconExclamation {...rest} />,
    eye: <IconEye {...rest} />,
    folder: <IconFolder {...rest} />,
    calendar: <IconCalendar {...rest} />,
  }
  const icon = icons[name]
  return icon
}
