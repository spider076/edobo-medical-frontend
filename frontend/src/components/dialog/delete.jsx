import React from 'react';

import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
// mui
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, alpha, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import { IoWarning } from 'react-icons/io5';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  apicall: PropTypes.func.isRequired,
  endPoint: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  deleteMessage: PropTypes.string.isRequired
};

export default function DeleteDialog({ onClose, id, apicall, endPoint, type, deleteMessage }) {
  const { isLoading, mutate } = useMutation(api[endPoint], {
    onSuccess: () => {
      toast.success(type);
      apicall((prev) => ({ ...prev, apicall: !prev.apicall }));
      onClose();
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    }
  });
  const handleDelete = () => {
    mutate(id);
  };
  return (
    <>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1
        }}
      >
        <Box
          sx={{
            height: 40,
            width: 40,
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
            borderRadius: '50px',
            color: (theme) => theme.palette.error.main,
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IoWarning size={24} />
        </Box>
        Warning
      </DialogTitle>
      <DialogContent sx={{ pb: '16px !important' }}>
        <DialogContentText>
          {/* {t("are-you-sure-you-want-to-delete-this-category?")} */}
          {deleteMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pt: '8px !important' }}>
        <Button onClick={onClose}> cancel </Button>
        <LoadingButton variant="contained" loading={isLoading} onClick={handleDelete} color="error">
          delete
        </LoadingButton>
      </DialogActions>
    </>
  );
}
