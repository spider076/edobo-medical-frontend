'use client';
import PropTypes from 'prop-types';

// mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Card, alpha, Skeleton } from '@mui/material';
// components
import MyAvatar from 'src/components/myAvatar';
const RootStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  height: 280,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 0,
  borderWidth: 0,
  borderBottomWidth: 1,
  backgroundColor: theme.palette.primary.main,
  '&:before': {
    content: "''",
    position: 'absolute',
    top: '-23%',
    left: '20%',
    transform: 'translateX(-50%)',
    backgroundColor: alpha(theme.palette.primary.light, 0.5),
    height: 130,
    width: 130,
    borderRadius: '100px',
    zIndex: 0
  },
  '&:after': {
    content: "''",
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '-5%',
    backgroundColor: alpha(theme.palette.primary.light, 0.5),
    height: 130,
    width: 130,
    borderRadius: '100px',
    zIndex: 0
  },
  '& > div:before': {
    content: "''",
    position: 'absolute',
    bottom: '-30%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: alpha(theme.palette.primary.light, 0.5),
    height: 130,
    width: 130,
    borderRadius: '100px',
    zIndex: 0
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(8),
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

export default function ProfileCover({ data: user, isLoading }) {
  return (
    <RootStyle>
      <div>
        <Container maxWidth="xl">
          <InfoStyle>
            <MyAvatar
              data={{ cover: user?.cover?.url, fullName: user?.firstName }}
              sx={{
                mx: 'auto',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'common.white',
                width: { xs: 80, md: 128 },
                height: { xs: 80, md: 128 }
              }}
            />
            <Box
              sx={{
                ml: { md: 3 },
                mt: { xs: 1, md: 0 },
                color: 'common.white',
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <Typography variant="h4">
                {isLoading ? <Skeleton variant="text" width={220} /> : user?.firstName + ' ' + user?.lastName}
              </Typography>
              <Typography sx={{ opacity: 0.72 }}>
                {isLoading ? <Skeleton variant="text" width={220} /> : user?.email}
              </Typography>
            </Box>
          </InfoStyle>
          <CoverImgStyle />
        </Container>
      </div>
    </RootStyle>
  );
}

// Add PropTypes
ProfileCover.propTypes = {
  data: PropTypes.shape({
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired
    }),
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  isLoading: PropTypes.bool.isRequired
};
