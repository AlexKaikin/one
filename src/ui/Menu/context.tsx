'use client'

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

export type MenuContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const MenuContext = React.createContext<MenuContextType | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const value = { open, setOpen }

  useEffect(() => {
    if (open) {
      // document.body.style.overflowY = 'hidden'
      // document.body.style.paddingRight = '10px'

      // let div = document.createElement('div')
      // div.className = 'wrapper'
      // document.body.append(div)
    } else {
      // document.body.style.overflowY = 'scroll'
      // document.body.style.paddingRight = '0px'

      // let div = document.querySelector('.wrapper')
      // div?.remove()
    }
  }, [open])

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}
