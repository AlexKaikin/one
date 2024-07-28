import { Product } from '@/types'
import { Button, Stack, Typography } from '@/ui'

export function NotAvailable({ product }: { product: Product }) {
  if (product.inStock > 0) return null

  return (
    <Stack flexDirection="column" spacing={1}>
      <Typography variant="p">Get notified when available.</Typography>
      <Button>Get notified</Button>
    </Stack>
  )
}
