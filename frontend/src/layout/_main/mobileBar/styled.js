import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';

const RootStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 999,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.paper, 0.72),
  outline: `1px solid ${theme.palette.divider}`,
  display: 'block',
  '& .appbar-wrapper': {
    display: 'flex',
    justifyContent: 'space-between'
  },
  '& .nav-button': {
    width: '20%',
    height: 54,
    flexDirection: 'column',
    fontSize: 11,
    span: {
      marginRight: 0,
      marginLeft: 0,
      svg: {
        fontSize: '24px'
      }
    },
    '&:focus': {
      backgroundColor: theme.palette.primary.main
    }
  },
  [theme.breakpoints.up('md')]: {
    display: 'none'
  }
}));
export default RootStyled;
