import { useEffect, useRef, useState } from 'react'

type Options = IntersectionObserverInit & { triggerOnce?: boolean }

const defaultOptions = {
  triggerOnce: false,
}

export function useInView(options: Options = defaultOptions) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>(
    undefined
  )
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([currentEntry]) => {
      if (options?.triggerOnce) {
        if (
          !entry?.isIntersecting &&
          entry?.isIntersecting !== currentEntry.isIntersecting
        ) {
          setEntry(currentEntry)
        }
      } else {
        if (entry?.isIntersecting !== currentEntry.isIntersecting) {
          setEntry(currentEntry)
        }
      }
    }, options)

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [entry, options])

  return { ref, inView: entry?.isIntersecting || false, entry }
}
