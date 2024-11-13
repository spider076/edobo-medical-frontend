import PropTypes from 'prop-types';
import Image from 'next/image';
// mui
import { Box } from '@mui/material';

export default function BlurImageAvatar({ ...props }) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 40,
        width: 40,
        borderRadius: '50%',
        overflow: 'hidden',
        ...props
      }}
    >
      <Image src={props.src} alt="user avatar" layout="fill" objectFit="cover" {...props} />
    </Box>
  );
}

BlurImageAvatar.propTypes = {
  src: PropTypes.string.isRequired
};
