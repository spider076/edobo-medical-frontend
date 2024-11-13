import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
const RootStyled = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 156,
  '& > .carousel-wrap': {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '100%',
    borderRadius: 0,
    '& .motion-dev': {
      position: 'absolute',
      width: '100%',
      overflow: 'hidden',
      top: 0
    },
    '& .slide-wrapper': {
      position: 'relative',
      paddingBottom: '100%',
      zIndex: 11,
      backgroundColor: 'transparent',
      borderRadius: 0,
      img: {
        borderRadius: '8px',
        objectPosition: 'center',
        border: `1px solid ${theme.palette.divider}`,
        ...(theme.direction === 'rtl' && {
          '-webkit-transform': 'scaleX(-1)',
          transform: 'scaleX(-1)'
        })
      }
    },
    '& .bg-overlay': {
      top: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: theme.palette.mode === 'dark' ? alpha(theme.palette.grey[800], 0.2) : ''
    },
    '& .controls-wrapper': {
      paddingTop: theme.spacing(2),
      overflow: 'auto',
      '& .controls-button': {
        minWidth: 60,
        minHeight: 60,
        position: 'relative',
        cursor: 'pointer',
        img: {
          borderRadius: '8px',
          border: `2px solid ${theme.palette.divider}`
        },

        '&.active': {
          img: {
            border: `2px solid ${theme.palette.primary.main}`
          }
        }
      }
    }
  }
}));
export default RootStyled;
