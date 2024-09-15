import { memo, useContext, useEffect } from 'react'
import { TriggersContext, TriggersContextType } from '../../context'

export const AutoScrollSwitcher = memo(function AutoScrollSwitcher({ inView }: { inView: boolean }) {
  const { setIsAutoScroll, isLoadingChat } = useContext(TriggersContext) as TriggersContextType

  useEffect(() => {
    if (!inView && !isLoadingChat) {
      setIsAutoScroll(false)
    } else {
      setIsAutoScroll(true)
    }
  }, [inView, isLoadingChat, setIsAutoScroll])

  return null
})
