import { forwardRef, Ref } from 'react'
import { Skeleton, Stack } from '@/ui'

export function ForwardRef(props: {}, ref?: React.Ref<HTMLDivElement>) {
  return (
    <div ref={ref}>
      <Stack flexDirection="row" spacing={2} style={{ padding: 'calc(var(--spacing)*2) 0' }}>
        <Stack>
          <Skeleton height={5} width={5} radius={5} />
        </Stack>

        <Stack isWide flexDirection="column" spacing={1}>
          <Skeleton height={1.5} width="90%" />
          <Skeleton height={1.5} width="40%" />
          <Skeleton height={1.5} width="70%" />
        </Stack>
      </Stack>
    </div>
  )
}

export const MessageSkeleton = forwardRef(ForwardRef)
