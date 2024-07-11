'use client'

import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'

export type TabsContextType = {
  titles: string[]
  setTitles: Dispatch<SetStateAction<string[]>>

  activeTab: string | null
  setActiveTab: Dispatch<SetStateAction<string | null>>
}

export const TabsContext = React.createContext<TabsContextType | null>(null)

export function TabsProvider({ children }: { children: ReactNode }) {
  const [titles, setTitles] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const value = { titles, setTitles, activeTab, setActiveTab }

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}
