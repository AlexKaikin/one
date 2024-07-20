'use client'

import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'

export type MenuContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const MenuContext = React.createContext<MenuContextType | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const value = { open, setOpen }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}
