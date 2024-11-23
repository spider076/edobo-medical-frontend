import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';

// mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image';

export const Logo = () => {
  const theme = useTheme();
  const { push } = useRouter();
  return (
    <Box
      sx={{
        cursor: 'pointer',

        img: {
          width: 150,
          height: 'auto'
        }
      }}
      onClick={() => push('/')}
    >
      <Image src="/edoboLogo.svg" alt="logo" width={150} height={150} />
    </Box>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  isMobile: PropTypes.bool
};
export default Logo;
