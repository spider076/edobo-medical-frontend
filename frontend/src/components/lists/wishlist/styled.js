import { styled } from '@mui/material/styles';
const RootStyled = styled('div')(({ theme }) => ({
  '& .MuiListItemAvatar-root': { marginTop: 0 },
  '& .circular-skeleton': {
    marginRight: theme.spacing(0.5)
  },
  '& .main-stack': {
    flexDirection: 'row',
    '& .inner-stack': {
      alignItems: 'center',
      flexDirection: 'row'
    }
  },
  '& .list-item-avatar': {
    width: 80,
    height: 80,
    borderRadius: '8px',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.divider}`
  },

  '& .list-item-text-p': {
    display: 'bolck'
  },
  '& .list-item-text-span': {
    display: 'inline'
  },
  '& .currency-heading': {
    textAlign: 'right'
  },
  '& .list-btn': {
    marginRight: theme.spacing(1)
  },
  '& .list-skeleton': {
    borderRadius: '8px',
    float: 'right'
  },
  '& .list-icon-btn': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px !important'
  },
  [theme.breakpoints.down('md')]: {
    '& .main-stack': {
      alignItems: 'end',
      flexDirection: 'column',
      '& .inner-stack': {
        alignItems: 'start',
        flexDirection: 'row',
        width: '100%'
      }
    },
    [theme.breakpoints.down('sm')]: {}
  }
}));
export default RootStyled;
