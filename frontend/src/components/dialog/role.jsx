import React from 'react';
import PropTypes from 'prop-types';
// mui
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog } from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { LoadingButton } from '@mui/lab';

export default function DeleteDialog({ onClose, open, onClick, loading }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
        <WarningRoundedIcon sx={{ mr: 1 }} /> Update role
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure to update the role for this user.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}> cancel </Button>
        <LoadingButton variant="contained" loading={loading} onClick={onClick}>
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
