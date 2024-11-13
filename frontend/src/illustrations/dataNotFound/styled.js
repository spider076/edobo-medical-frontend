import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const RootStyled = styled(Box)(({ theme }) => ({
  maxWidth: 500,

  width: '100%',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    width: 500,
    height: 500
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 300,
    svg: {
      width: 300,
      height: 300
    }
  }
}));
export default RootStyled;
