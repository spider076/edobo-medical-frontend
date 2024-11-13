import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
const RootStyled = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(0.5),
    overflow: 'inherit',
    background: theme.palette.background.paper
  },
  '& .is-desktop': {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
    right: theme.spacing(16),
    m: 'auto',
    borderRadius: theme.spacing(2),
    overflow: 'auto',
    display: 'flex',
    gap: 1,
    width: 'calc(100vw - 44px)',
    border: `1px solid ${theme.palette.divider}`
  }
}));
export default RootStyled;
