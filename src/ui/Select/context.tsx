'use client';

import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { useTranslation } from '@/store';


export type SelectContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>

  active: any
  setActive: Dispatch<SetStateAction<any>>

  optionValue: any
  setOptionValue: Dispatch<SetStateAction<any>>
}

export const SelectContext = React.createContext<SelectContextType | null>(null)

export function SelectProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const [active, setActive] = useState(t('choose'))
  const [optionValue, setOptionValue] = useState<any>()

  const value = {
    open,
    setOpen,
    active,
    setActive,
    optionValue,
    setOptionValue,
  }

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  )
}