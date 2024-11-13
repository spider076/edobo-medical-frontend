'use client';
// mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
const RootStyles = styled(Box)(({ theme }) => ({
  '& .gradient': {
    background: theme.palette.primary.main,
    width: '100%',
    borderRadius: '0 0 40px 40px',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(16),
    '& .company-name': {
      fontWeight: 800,
      textTransform: 'uppercase',
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0)
    }
  },
  '& .card': {
    maxWidth: 560,
    margin: 'auto',
    marginTop: '80px',
    marginBottom: '80px',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 3)
  },
  '& .password-card': {
    maxWidth: 560,
    margin: 'auto',
    marginTop: '80px',
    marginBottom: '80px',
    padding: theme.spacing(4),
    '& .full-width-btn': {
      marginTop: theme.spacing(1)
    }
  }
}));
export default RootStyles;
