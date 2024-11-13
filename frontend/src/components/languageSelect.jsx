import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeCurrency } from 'src/redux/slices/settings';

// mui
import { Grid, Button, Stack, alpha, Skeleton, Typography, IconButton, DialogContent, Dialog } from '@mui/material';

// icons
import { MdClear } from 'react-icons/md';
import { MdCurrencyExchange } from 'react-icons/md';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

export default function LanguageSelect() {
  const dispatch = useDispatch();
  const { currency } = useSelector(({ settings }) => settings);
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useQuery(['get-currencies'], () => api.getCurrencies());
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="lang-curr-select"
        onClick={handleClickOpen}
        color="primary"
        sx={{
          borderColor: 'primary',
          borderWidth: 1,
          borderStyle: 'solid',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1)
        }}
      >
        <MdCurrencyExchange />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 5,
            top: 5,
            zIndex: 111
          }}
        >
          <MdClear />
        </IconButton>
        <DialogContent>
          <Typography variant="h5" mb={2}>
            Choose a currency
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            {(isLoading ? Array.from(new Array(12)) : data?.data || []).map((cur) => (
              <Grid key={Math.random()} item xs={12} sm={6} md={4}>
                <Button
                  onClick={() =>
                    dispatch(
                      handleChangeCurrency({
                        currency: cur.code,
                        rate: cur.rate
                      })
                    )
                  }
                  fullWidth
                  size="large"
                  variant={'outlined'}
                  color={currency === cur?.code ? 'primary' : 'inherit'}
                  sx={{
                    textAlign: 'left',
                    justifyContent: 'start'
                  }}
                >
                  <Stack>
                    <Typography variant="subtitle2" noWrap>
                      {isLoading ? <Skeleton variant="text" width={120} /> : `${cur.name}-${cur.code}`}
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {isLoading ? <Skeleton variant="text" width={60} /> : cur.country}
                    </Typography>
                  </Stack>
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
