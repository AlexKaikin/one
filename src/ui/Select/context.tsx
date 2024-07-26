'use client'

import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { useTranslation } from '@/store'

export type SelectContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>

  active: any
  setActive: Dispatch<SetStateAction<any>>

  optionValue: any
  setOptionValue: Dispatch<SetStateAction<any>>

  style: Style
  setStyle: Dispatch<SetStateAction<Style>>
}

type Style = {
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export const SelectContext = React.createContext<SelectContextType | null>(null)

export function SelectProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [optionValue, setOptionValue] = useState<any>()
  const [style, setStyle] = useState({})

  const value = {
    open,
    setOpen,
    active,
    setActive,
    optionValue,
    setOptionValue,
    style,
    setStyle,
  }

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  )
}
