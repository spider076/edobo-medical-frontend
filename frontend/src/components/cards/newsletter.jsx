import React from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
// mui
import { Grid, Paper, Typography, Skeleton, IconButton, Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { fDateShort } from 'src/utils/formatTime';
// icons
import { MdContentCopy } from 'react-icons/md';

const RootStyle = styled(Paper)(({ theme }) => ({
  padding: '10px 10px 10px 16px',
  marginBottom: '0.5rem',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid ' + theme.palette.divider,
  borderRadius: 4,

  '& .phone-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '0.5rem'
  }
}));

export default function NewsLetterCard({ item, isLoading, onClickCopy }) {
  return (
    <RootStyle key={uniqueId()}>
      <Grid container alignItems="center">
        <Grid item md={8} sm={8} xs={8}>
          <Typography variant="subtitle1">
            {isLoading ? <Skeleton variant="text" width={200} /> : item.email}
          </Typography>
          <Typography variant="body1">
            {isLoading ? <Skeleton variant="text" width={200} /> : fDateShort(item.createdAt)}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Box className="phone-container">
            {isLoading ? (
              <Skeleton variant="circular" width={30} height={30} />
            ) : (
              <Tooltip title="Copied Email">
                <IconButton
                  className="btn-phone"
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(item.email);
                    onClickCopy();
                  }}
                >
                  <MdContentCopy size={20} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
NewsLetterCard.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool,
  onClickCopy: PropTypes.func
};
