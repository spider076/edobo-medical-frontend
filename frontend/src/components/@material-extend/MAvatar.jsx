import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// mui
import { Avatar, useTheme } from '@mui/material';

const MAvatar = forwardRef(function MAvatar({ color = 'default', sx, children, ...other }, ref) {
  const theme = useTheme();

  if (color === 'default') {
    return (
      <Avatar ref={ref} sx={sx} {...other}>
        {children}
      </Avatar>
    );
  }

  return (
    <Avatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx
      }}
      {...other}
    >
      {children}
    </Avatar>
  );
});

MAvatar.displayName = 'MAvatar';

MAvatar.propTypes = {
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success']),
  sx: PropTypes.object,
  children: PropTypes.node
};

export default MAvatar;
