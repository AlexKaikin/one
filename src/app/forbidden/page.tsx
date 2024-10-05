import Image from 'next/image'
import { Button, Icon, Page, PageContent, Stack, Typography } from '@/ui'
import imageSrc from '../../assets/images/common/403.png'

export default function NotFound() {
  return (
    <Page>
      <PageContent>
        <Stack alignItems="center" justifyContent="center" isWide>
          <Stack flexDirection="column" spacing={2} alignItems="center">
            <div>
              <Image height={300} width={300} src={imageSrc} alt="Cart empty" />
            </div>

            <Typography variant="h2" align="center">Access Denied</Typography>
            <Typography variant="p" align="center">
              You do not have permission to view this page.
            </Typography>

            <Button href="/" endIcon={<Icon name="chevronRight" height={16} width={16} />}>
              Go home
            </Button>
          </Stack>
        </Stack>
      </PageContent>
    </Page>
  )
}
