import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
// mui
import { Box } from '@mui/material';
// components
import { varWrapEnter } from './variants';

// ----------------------------------------------------------------------

export default function MotionContainer({ ...props }) {
  const { open, children, ...other } = props;
  return (
    <Box component={motion.div} initial={false} animate={open ? 'animate' : 'exit'} variants={varWrapEnter} {...other}>
      {children}
    </Box>
  );
}
MotionContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
