import React, { useContext } from 'react'
import { useDebounce } from '@/hooks'
import { Icon, IconButton } from '@/ui'
import { TriggersContext, TriggersContextType } from '../../context'
import styles from './ScrollDownButton.module.css'

export function ScrollDownButton() {
  const { isAutoScroll, setIsScrollToLastMessage } = useContext(
    TriggersContext
  ) as TriggersContextType
  const debouncedIsAutoScroll = useDebounce(isAutoScroll, 1000)

  if (debouncedIsAutoScroll || isAutoScroll) {
    return null
  }

  return (
    <div className={styles.root}>
      <div className={styles.button}>
        <IconButton color='primary' onClick={() => setIsScrollToLastMessage(true)}>
          <Icon name="arrowDropDown" width={16} height={16} />
        </IconButton>
      </div>
    </div>
  )
}
