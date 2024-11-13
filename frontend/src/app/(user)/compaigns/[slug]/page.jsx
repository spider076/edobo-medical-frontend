// mui
import { Box, Container } from '@mui/material';

// components
import ShopDetailCover from 'src/components/_admin/shops/shopDetailCover';
import ProductList from 'src/components/_main/products';

// api
import * as api from 'src/services';

export const dynamic = 'error';
export const revalidate = 10;

export async function generateStaticParams() {
  const { data } = await api.getCompaignSlugs();
  const mapped = data?.map((compaign) => {
    return {
      slug: compaign.slug
    };
  });
  return mapped;
}

export async function generateMetadata({ params }) {
  const { data: response } = await api.getCompaignBySlug(params.slug);

  return {
    title: response.metaTitle,
    description: response.metaDescription,
    title: response.title,
    openGraph: {
      images: [response.cover.url]
    }
  };
}
export default async function Listing({ params }) {
  const { slug } = params;
  const { data: compaign } = await api.getCompaignTitle(slug);

  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box mt={3}>
            <ShopDetailCover page={'compaigns'} isUser data={compaign} isLoading={false} />
          </Box>

          <ProductList compaign={compaign} fetchFilters={'getFiltersByShop'} />
        </Container>
      </Box>
    </Box>
  );
}
