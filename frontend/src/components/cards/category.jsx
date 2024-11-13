'use client';
import PropTypes from 'prop-types';
import Link from 'next/link';
// mui
import { Typography, CardActionArea, Card, Box, Skeleton, Stack } from '@mui/material';
// components
import Image from 'src/components/blurImage';

export default function CategoriesCard({ ...props }) {
  const { category, isLoading } = props;
  const baseUrl = '/products/';

  return (
    <Stack spacing={1} alignItems="center">
      <Card
        sx={{
          borderRadius: '50%',
          borderWidth: '3px !important',
          transform: 'scale(1.0)',
          transition: 'all 0.2s ease-in-out',
          width: { xs: 90, md: 175 },
          height: { xs: 90, md: 175 },
          border: isLoading && 'none !important',
          '&:hover': {
            color: '#000',
            borderColor: (theme) => theme.palette.primary.main + '!important',
            transform: 'scale(1.05)'
          },
          '& .image-wrapper': {
            position: 'relative',
            width: '100%',
            img: {
              borderRadius: '50%'
            },
            '&:after': {
              content: `""`,
              display: 'block',
              paddingBottom: '100%'
            }
          }
        }}
      >
        {isLoading ? (
          <Skeleton
            variant="circular"
            sx={{
              position: 'absolute',
              height: '100%',
              width: '100%'
            }}
          />
        ) : (
          <CardActionArea className="card-action-area" component={Link} href={`${baseUrl + category?.slug}`}>
            <Box p={0.4} sx={{ bgcolor: (theme) => theme.palette.background.default }}>
              <Box className="image-wrapper">
                <Image
                  alt="category"
                  src={category?.cover?.url}
                  placeholder="blur"
                  blurDataURL={category?.cover?.blurDataURL}
                  layout="fill"
                  objectFit="cover"
                  static
                  draggable="false"
                  quality={5}
                  sizes={'50vw'}
                />
              </Box>
            </Box>
          </CardActionArea>
        )}
      </Card>
      <Typography
        {...(!isLoading && {
          component: Link,
          href: baseUrl + category.slug
        })}
        color="text.primary"
        variant="h5"
        textAlign="center"
        noWrap
        className="title"
        sx={{ py: 0.5, textTransform: 'capitalize' }}
      >
        {isLoading ? <Skeleton variant="text" width={100} /> : category?.name}
      </Typography>
    </Stack>
  );
}
CategoriesCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
      blurDataURL: PropTypes.string.isRequired
    }),
    name: PropTypes.string.isRequired
  }).isRequired
};
