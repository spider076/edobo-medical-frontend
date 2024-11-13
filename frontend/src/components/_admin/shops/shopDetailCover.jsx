'use client';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';
// mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Card, Skeleton, Stack, alpha } from '@mui/material';
// components
import MyAvatar from 'src/components/myAvatar';
// icons
import { IoIosArrowForward } from 'react-icons/io';

const RootStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: 300,
  position: 'relative',
  overflow: 'hidden',
  borderWidth: 0,
  borderBottomWidth: 1,
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  bottom: '35px !important',
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}));

const CoverImgStyle = styled('div')({
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

export default function ShopDetailCover({ data, isLoading, isUser, page }) {
  return (
    <RootStyle>
      {!isLoading && (
        <Image
          src={data?.cover?.url}
          alt={data?.title || data?.name}
          placeholder="blur"
          blurDataURL={data?.cover?.blurDataURL}
          objectFit="cover"
          fill
        />
      )}

      <div>
        <Container maxWidth="xl">
          <InfoStyle>
            {data?.logo ? (
              <MyAvatar
                data={{ cover: data?.logo?.url, fullName: data?.title }}
                sx={{
                  mx: 'auto',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  borderColor: 'common.white',
                  width: { xs: 80, md: 128 },
                  height: { xs: 80, md: 128 },
                  boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`
                }}
              />
            ) : null}

            <Box
              sx={{
                ml: { md: 3 },
                mt: { xs: 1, md: 0 },
                color: 'common.white',
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <Typography variant="h4">
                {isLoading ? <Skeleton variant="text" width={220} /> : data?.title || data?.name}
              </Typography>
              {isUser ? (
                <Stack direction="row" alignItems="center" justifyContent="end" spacing={0.5}>
                  <Typography variant="body1" component={NextLink} href="/" color="common.white">
                    Home
                  </Typography>
                  <IoIosArrowForward size={12} />
                  <Typography
                    variant="body1"
                    component={NextLink}
                    href={page}
                    color="common.white"
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  >
                    {page}
                  </Typography>
                  <IoIosArrowForward size={12} />
                  <Typography variant="body1">{data?.title || data?.name}</Typography>
                </Stack>
              ) : (
                <Typography variant="body1">
                  {isLoading ? <Skeleton variant="text" width={220} /> : data?.description}
                </Typography>
              )}
            </Box>
          </InfoStyle>
          <CoverImgStyle />
        </Container>
      </div>
      {/* <Toolbar
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          bgcolor: 'background.paper',
          minHeight: `48px !important`
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          spacing={3}
          sx={{
            width: '100% !important',
            position: 'relative',
            '.MuiTypography-root': {
              display: 'flex !important'
            }
          }}
        >
          {data?.approved ? (
            <Stack direction="row" alignItems="center" justifyContent="end" spacing={1}>
              <MdVerified color="#3F95FE" />
              <Typography variant="body2">
                {isLoading ? <Skeleton variant="text" width={80} /> : fDateShort(data?.approvedAt)}
              </Typography>
            </Stack>
          ) : null}

          {!isUser && (
            <>
              <Stack direction="row" alignItems="center" justifyContent="end" spacing={1}>
                <BiMap />
                <Typography variant="body2">
                  {isLoading ? (
                    <Skeleton variant="text" width={100} />
                  ) : (
                    data?.address?.streetAddress +
                    ' ' +
                    data?.address?.city +
                    ' ' +
                    data?.address?.state +
                    ' ' +
                    data?.address?.country
                  )}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="end" spacing={1}>
                <IoCall />
                <Typography variant="body2">
                  {isLoading ? <Skeleton variant="text" width={100} /> : data?.phone}
                </Typography>
              </Stack>
            </>
          )}
        </Stack>
      </Toolbar> */}
    </RootStyle>
  );
}

// Add PropTypes
ShopDetailCover.propTypes = {
  data: PropTypes.shape({
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired
    }),
    logo: PropTypes.shape({
      url: PropTypes.string.isRequired
    }),

    title: PropTypes.string.isRequired,
    approved: PropTypes.bool,
    approvedAt: PropTypes.bool,
    address: PropTypes.object.isRequired,
    phone: PropTypes.any,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isUser: PropTypes.bool
};
