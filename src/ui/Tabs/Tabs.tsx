'use client'

import { ReactNode, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import { Button } from '../Button/Button'
import styles from './Tabs.module.css'
import { TabsContext, TabsContextType, TabsProvider } from './TabsProvider'

export function Tabs({ children }: { children: ReactNode }) {
  return (
    <TabsProvider>
      <TabsWithContext>{children}</TabsWithContext>
    </TabsProvider>
  )
}

export function TabsWithContext({ children }: { children: ReactNode }) {
  const { titles, activeTab, setActiveTab } = useContext(
    TabsContext
  ) as TabsContextType

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {titles.map((title, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(title)}
            className={cn(styles.tab, {
              [styles['active']]: title === activeTab,
            })}
          >
            {title}
          </div>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}

export function Tab({
  title,
  active,
  children,
}: {
  title: string
  active?: boolean
  children: ReactNode
}) {
  const { activeTab, setTitles, setActiveTab } = useContext(
    TabsContext
  ) as TabsContextType

  useEffect(() => {
    setTitles(prev => (prev.includes(title) ? prev : [...prev, title]))

    if (active) {
      setActiveTab(title)
    }
  }, [active, setActiveTab, setTitles, title])

  if (activeTab !== title) {
    return null
  }

  return children
}
