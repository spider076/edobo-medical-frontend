import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { createGradient } from 'src/theme/palette';

const RootStyled = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .detail-card': {
    minHeight: 226,
    position: 'relative',
    background: createGradient(theme.palette.primary.main, theme.palette.primary.dark),
    color: theme.palette.common.white,
    zIndex: 0,
    '&:before': {
      content: "''",
      position: 'absolute',
      top: '-20%',
      left: '40%',
      transform: 'translateX(-50%)',
      background: alpha(theme.palette.primary.light, 0.5),
      height: 80,
      width: 80,
      borderRadius: '50px',
      zIndex: 2
    },
    '&:after': {
      content: "''",
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: '-14%',
      background: alpha(theme.palette.primary.light, 0.5),
      height: 80,
      width: 80,
      borderRadius: '50px',
      zIndex: 2
    },
    '& .detail-card-content': {
      position: 'relative',
      zIndex: 2,
      '&:before': {
        content: "''",
        position: 'absolute',
        bottom: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: alpha(theme.palette.primary.light, 0.5),
        height: 80,
        width: 80,
        borderRadius: '50px',
        zIndex: -1
      }
    },
    '& .detail-card-btn': {
      display: 'block',
      minWidth: 50,
      lineHeight: 0,
      minHeight: 50,
      color: theme.palette.common.white,
      background: alpha(theme.palette.primary.light, 0.5),
      boxShadow: 'none',
      '&:hover': {
        background: theme.palette.primary.dark
      },
      '& .email-heading': {
        wordWrap: 'break-word'
      }
    }
  },
  '& .skeleton': {
    marginLeft: 'auto'
  }
}));
export default RootStyled;
