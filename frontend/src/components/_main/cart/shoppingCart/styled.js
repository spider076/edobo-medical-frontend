import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const RootStyled = styled(Box)(({ theme }) => ({
  '& .card-main': {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    '& .card-header': {
      marginBottom: theme.spacing(1),
      padding: 0
    }
  },
  [theme.breakpoints.down('sm')]: {
    '& .product-list': {
      display: 'none'
    },
    '& .card-main': {
      marginBottom: theme.spacing(2)
    }
  }
}));
export default RootStyled;
