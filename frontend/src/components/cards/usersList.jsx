import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
import { uniqueId } from 'lodash';
// mui
import { Grid, Paper, Typography, Skeleton, Box, Stack, IconButton, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { fDateShort } from 'src/utils/formatTime';
import BlurImage from 'src/components/blurImage';
// lodash
import { capitalize } from 'lodash';
// icons
import { FiEye } from 'react-icons/fi';
import { LuUser2 } from 'react-icons/lu';
import { FaUserCheck } from 'react-icons/fa6';

const RootStyle = styled(Paper)(({ theme }) => ({
  padding: '10px 10px 10px 16px',
  marginBottom: '0.5rem',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid ' + theme.palette.divider,
  borderRadius: 4,
  '& .name': {
    fontWeight: 600,
    color: theme.palette.info.main
  },
  '& .time svg': {
    width: 10,
    height: 10,
    '& path': {
      fill: theme.palette.text.primary
    }
  },
  '& .date': {
    fontSize: '0.75rem',
    fontWeight: 500
  },
  '& .callander': {
    '& svg': {
      width: 10,
      height: 10
    }
  },
  '& .time-slot': {
    fontWeight: 500,
    fontSize: '0.75rem'
  },
  '& .phone-container': {
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.5rem',
    '& .phone': {
      color: theme.palette.text.secondary,
      fontWeight: 400,
      fontSize: 11
    },
    '& .btn-phone': {
      fontSize: '1px'
    }
  }
}));
const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 50,
  minWidth: 50,
  height: 50,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
  border: '1px solid' + theme.palette.divider,
  position: 'relative',
  overflow: 'hidden'
}));

export default function UserListCard({ item, isLoading }) {
  const router = useRouter();
  return (
    <RootStyle key={uniqueId()}>
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {isLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : item?.cover?.url ? (
              <ThumbImgStyle>
                <BlurImage priority fill alt={item?.firstName + ' thumbnail'} src={item?.cover?.url} />
              </ThumbImgStyle>
            ) : (
              <Avatar color="primary" sx={{ mr: 1 }}>
                {item?.firstName.slice(0, 1)}
              </Avatar>
            )}
            <Stack spacing={0.1}>
              {/* <Link
                className="name"
                component={NextLink}
                href={`/dashboard/users/${item?._id}`}
                underline="none"
              >
                {isLoading ? (
                  <Skeleton variant="text" />
                ) : (
                  `${capitalize(item.firstName)} ${capitalize(item.firstName)}`
                )}
              </Link> */}
              <Typography noWrap variant="h6">
                {isLoading ? <Skeleton variant="text" /> : capitalize(item.firstName).slice(0, 20)}
              </Typography>
              <Stack spacing={1} direction="row" alignItems="center">
                <Typography className="time-slot">
                  {isLoading ? <Skeleton variant="text" width={50} /> : item?.email}
                </Typography>
              </Stack>
              <Stack spacing={1} direction="row" alignItems="center">
                <Typography className="date">
                  {isLoading ? <Skeleton variant="text" width={50} /> : item?.phone}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Box className="phone-container">
            <Stack spacing={1} justifyContent="end">
              <Typography className="date">
                {isLoading ? <Skeleton variant="text" width={66} /> : fDateShort(item.createdAt)}
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="end" spacing={0.5}>
                {isLoading ? (
                  <>
                    <Skeleton variant="circular" width={28} height={28} />
                    <Skeleton variant="circular" width={28} height={28} />
                  </>
                ) : (
                  <>
                    {item.role === 'super admin' ? (
                      <IconButton size="small" disabled onClick={() => router.push(`/admin/users/${item?._id}`)}>
                        <FaUserCheck />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setId(item._id);
                        }}
                      >
                        {item.role === 'admin' ? <FaUserCheck /> : <LuUser2 />}
                      </IconButton>
                    )}
                    <IconButton size="small" onClick={() => router.push(`/admin/users/${item?._id}`)}>
                      <FiEye />
                    </IconButton>
                  </>
                )}
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
UserListCard.propTypes = {
  item: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};
