import React from 'react';
import PropTypes from 'prop-types';
// mui
import { Grid } from '@mui/material';
// components
import MenuDesktopList from 'src/components/lists/menuDesktopList';
import MenuPopover from 'src/components/popover/popover';

export default function MenuDesktop({ ...props }) {
  const { isOpen, onClose, isLoading, data, scrollPosition } = props;

  return (
    <MenuPopover
      open={isOpen}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: scrollPosition > 100 ? 134 : 170,
        left: 0
      }}
      isDesktop
      sx={{
        display: 'block!important'
      }}
    >
      <Grid container spacing={3}>
        {data?.map((parent) => {
          return (
            <Grid item lg={2} key={Math.random()}>
              <MenuDesktopList parent={parent} isLoading={isLoading} onClose={onClose} />
            </Grid>
          );
        })}
      </Grid>
    </MenuPopover>
  );
}
MenuDesktop.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.array,
  scrollPosition: PropTypes.number.isRequired
};
