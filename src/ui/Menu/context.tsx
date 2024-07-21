'use client'

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from 'react'

export type MenuContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>

  style: Style
  setStyle: Dispatch<SetStateAction<Style>>

  handleCloseMenu: () => void
  handleToggleMenu: () => void
}

type Style = {
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export const MenuContext = React.createContext<MenuContextType | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState({})

  const handleCloseMenu = useCallback(() => {
    setOpen(false)
    setStyle({})
  }, [setOpen, setStyle])

  const handleToggleMenu = useCallback(() => {
    if (open) {
      setOpen(false)
      setStyle({})
    } else {
      setOpen(true)
    }
  }, [open, setOpen, setStyle])

  const value = {
    open,
    setOpen,
    style,
    setStyle,
    handleCloseMenu,
    handleToggleMenu,
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}
