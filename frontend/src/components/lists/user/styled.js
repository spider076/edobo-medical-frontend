import MenuList from '@mui/material/MenuList';
import { styled } from '@mui/material/styles';
const RootStyled = styled(MenuList)(({ theme }) => ({
  borderRadius: 8,
  '& .menu-item': {
    marginTop: theme.spacing(1)
  },
  '& .menu-icon': {
    marginRight: 0
  }
}));
export default RootStyled;
