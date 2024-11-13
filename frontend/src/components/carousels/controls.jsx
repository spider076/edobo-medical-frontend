import PropTypes from 'prop-types';

// mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RootStyle = styled(Box)(({ theme }) => ({
  top: 0,
  bottom: 0,
  zIndex: 9,
  height: 40,
  width: '100%',
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  padding: theme.spacing(0, 2),
  justifyContent: 'space-between'
}));
CarouselControls.propTypes = {
  arrowLine: PropTypes.bool,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func
};

export default function CarouselControls({ ...props }) {
  const { onNext, onPrevious, ...other } = props;
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  return (
    <RootStyle {...other}>
      <Fab aria-label="right" onClick={onPrevious} size="small" sx={{ position: 'absolute', left: -24 }}>
        {isRTL ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      </Fab>

      <Fab aria-label="right" onClick={onNext} size="small" sx={{ position: 'absolute', right: -24 }}>
        {!isRTL ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      </Fab>
    </RootStyle>
  );
}
