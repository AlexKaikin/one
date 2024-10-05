'use client';

import { useFavoriteProducts } from '@/store';
import { Button, Page, PageContent, Stack, Typography } from '@/ui';
import imageSrc from '../../../assets/images/common/empty-favorites.png'
import { Products } from '../_elements'
import Image from 'next/image';


export default function FavoritesPage() {
  const { favoritesItems } = useFavoriteProducts()

  if (!favoritesItems.length)
    return (
      <Page>
        <PageContent>
          <Stack alignItems="center" justifyContent="center" isWide>
            <Stack flexDirection="column" spacing={2} alignItems="center">
              <div>
                <Image height={300} width={300} src={imageSrc} alt="No favorites" />
              </div>

              <Typography variant="h2" align="center">No favorites products</Typography>

              <Typography variant="p" align="center">
                It looks like you haven&rsquo;t added anything to your favorites yet.
              </Typography>

              <Button href="/shop">Go shop</Button>
            </Stack>
          </Stack>
        </PageContent>
      </Page>
    )

  return (
    <Page>
      <PageContent>
        <Products products={favoritesItems} totalCount={'0'} />
      </PageContent>
    </Page>
  )
}