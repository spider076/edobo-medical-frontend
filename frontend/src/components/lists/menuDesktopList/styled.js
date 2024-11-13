import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
const RootStyled = styled(List)(({ theme }) => ({
  '& .MuiListSubheader-root': {
    paddingRight: theme.spacing(2)
  },
  '& .list-subheader': {
    ...theme.typography.overline,
    display: 'flex',
    cursor: 'pointer',
    gap: 0,
    lineHeight: 'unset',
    alignItems: 'center',
    color: theme.palette.text.primary,
    typography: 'overline'
  },
  '& .list-item': {
    ...theme.typography.body2,
    padding: 0,
    marginTop: theme.spacing(3),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('color'),
    cursor: 'pointer',
    textTransform: 'capitalize',
    '&.active': {
      color: theme.palette.text.primary,
      typography: 'subtitle2'
    },
    '&:hover': {
      color: theme.palette.text.primary
    }
  },
  '& .icon-bullet-main': {
    width: 24,
    height: 16,
    display: 'flex',
    alignItems: 'center',
    '& .icon-bullet-inner': {
      marginLeft: '2px',
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: 'currentColor',
      '&.active': {
        marginLeft: 0,
        width: 8,
        height: 2,
        borderRadius: 2
      }
    }
  },
  '& .circular-sekelton': {
    paddingRight: theme.spacing(2)
  }
}));
export default RootStyled;
