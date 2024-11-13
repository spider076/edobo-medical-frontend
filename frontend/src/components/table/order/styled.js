import { styled, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';

const RootStyled = styled(Card)(({ theme }) => ({
  '& .body-row': {
    '& .MuiTableCell-root': {
      background: alpha(theme.palette.primary.main, 0.1)
    }
  },
  '& .skeleton-h5': {
    margin: theme.spacing(2)
  },
  '&  .skeleton-text': {
    float: 'right'
  }
}));
export default RootStyled;
