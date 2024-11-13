// react
import React from 'react';
import { useRouter } from 'next-nprogress-bar';
import PropTypes from 'prop-types';

// mui
import { IconButton, Stack, Typography, alpha } from '@mui/material';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useSelector } from 'react-redux';

WishlistPopover.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

// ----------------------------------------------------------------------
export default function WishlistPopover() {
  const router = useRouter();

  const { wishlist } = useSelector(({ wishlist }) => wishlist);
  const { isAuthenticated } = useSelector(({ user }) => user);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        width="auto"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          if (!isAuthenticated) {
            router.push('/auth/login');
          } else {
            router.push('/profile/wishlist');
          }
        }}
        spacing={1}
      >
        <IconButton
          name="wishlist"
          color="primary"
          disableRipple
          sx={{
            ml: 1,
            borderColor: 'primary',
            borderWidth: 1,
            borderStyle: 'solid',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1)
          }}
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/auth/login');
            } else {
              router.push('/profile/wishlist');
            }
          }}
        >
          <IoMdHeartEmpty />
        </IconButton>
        <Stack>
          <Typography variant="subtitle2" color="text.primary" mb={-0.6}>
            Wishlist
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {wishlist?.length || 0} {wishlist?.length > 1 ? 'Items' : 'Item'}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
