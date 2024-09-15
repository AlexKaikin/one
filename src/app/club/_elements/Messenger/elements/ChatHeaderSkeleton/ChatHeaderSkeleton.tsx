import { Skeleton, Stack } from '@/ui'

export function ChatHeaderSkeleton() {
  return (
    <Stack flexDirection="row" spacing={2} alignItems="center">
      <Stack>
        <Skeleton height={5} width={5} radius={5} />
      </Stack>

      <Stack isWide flexDirection="column" spacing={1}>
        <Skeleton height={1.5} width="100px" />
        <Skeleton height={1.5} width="40%" />
      </Stack>
    </Stack>
  )
}
