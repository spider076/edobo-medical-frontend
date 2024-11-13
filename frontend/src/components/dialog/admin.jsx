'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';

// mui
import { Stack, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
// assets
import { SuccessPopupIcon } from 'src/assets';
// icons
import { IoClose } from 'react-icons/io5';

AdminDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default function AdminDialog({ isOpen }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handlePopupClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    router.push('/auth/register');
    setOpen(false);
  };
  React.useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      {isOpen && (
        <Dialog
          open={open}
          keepMounted
          onClose={handlePopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '& .MuiPaper-root': {
              display: 'flex',
              alignItems: 'center',
              padding: { md: 8, xs: 2 },
              background: theme.palette.background.paper,
              maxWidth: '535px !important',
              position: 'relative'
            }
          }}
        >
          <IconButton aria-label="delete" sx={{ position: 'absolute', top: 8, right: 8 }} onClick={handlePopupClose}>
            <IoClose />
          </IconButton>

          <SuccessPopupIcon />
          <Stack spacing={2} sx={{ width: '100%', mt: 1 }}>
            <DialogTitle
              sx={{
                fontSize: 24,
                fontWeight: 700,
                padding: '0 !important',
                lineHeight: 0
              }}
              textAlign="center"
            >
              WELCOME TO Nextall
            </DialogTitle>
            <Typography variant="body1" textAlign="center" color="GrayText">
              Attention: Please ensure all necessary environment variables are set.
            </Typography>

            <DialogActions sx={{ width: '100% !important', padding: '0 !important' }}>
              <Button variant="contained" size="large" onClick={handleClose} fullWidth>
                Register as Admin
              </Button>
            </DialogActions>
          </Stack>
        </Dialog>
      )}
    </React.Fragment>
  );
}
