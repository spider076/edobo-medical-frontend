import { styled } from '@mui/material/styles';
import { createGradient } from 'src/theme/palette';
const RootStyled = styled('div')(({ theme }) => ({
  '& .table-main': {
    minWidth: 450,
    '& .head-row': {
      background: createGradient(theme.palette.primary.main, theme.palette.primary.dark),
      '& .head-row-cell': {
        color: theme.palette.common.white
      }
    },
    '& .body-row-cell': {}
  },
  [theme.breakpoints.down('sm')]: {
    // display: "none",
    '& .head-row-cell': {
      color: theme.palette.common.white,
      '&.active': {
        display: 'none'
      }
    },
    '& .body-column-cell': {
      display: 'none'
    }
  }
}));
export default RootStyled;
