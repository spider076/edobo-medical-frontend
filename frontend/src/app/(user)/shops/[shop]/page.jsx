// mui
import { Box, Container } from '@mui/material';

// components
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ProductList from 'src/components/_main/products';

// api
import * as api from 'src/services';

export const revalidate = 10;
export const dynamic = 'error';

export async function generateStaticParams() {
  const { data } = await api.getShopSlugs();
  const mapped = data?.map((shop) => {
    return {
      shop: shop.slug
    };
  });
  return mapped;
}

export async function generateMetadata({ params }) {
  const { data: response } = await api.getShopBySlug(params.shop);

  return {
    title: response.metaTitle,
    description: response.metaDescription,
    title: response.title,
    openGraph: {
      images: [response.logo.url]
    }
  };
}
export default async function Listing({ params }) {
  const { shop } = params;
  const { data: shopData } = await api.getShopTitle(shop);

  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box mt={3}>
            <ShopDetailCover page="shops" isUser data={shopData} isLoading={false} />
          </Box>

          <ProductList shop={shopData} fetchFilters={'getFiltersByShop'} />
        </Container>
      </Box>
    </Box>
  );
}
