import { Skeleton, Stack } from '@/ui'

export function ChatSkeleton() {
  return (
    <Stack
      flexDirection="row"
      spacing={2}
      alignItems="center"
      style={{ padding: 'calc(var(--spacing)* 2)' }}
    >
      <Stack>
        <Skeleton height={5} width={5} radius={5} />
      </Stack>

      <Stack isWide flexDirection="column" spacing={1}>
        <Stack flexDirection="row" spacing={2} justifyContent="space-between">
          <Skeleton height={1.5} width={12} />
          <Skeleton height={1.5} width={5} />
        </Stack>

        <Skeleton height={1.5} width="70%" />
      </Stack>
    </Stack>
  )
}
