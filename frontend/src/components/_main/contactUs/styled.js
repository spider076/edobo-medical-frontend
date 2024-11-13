import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const RootStyled = styled(Box)(({ theme }) => ({
  'h1 span': {
    color: theme.palette.primary.main
  },
  background: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(10, 0),
  '& .mail-box': {
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    background: theme.palette.background.paper,
    '& .choose-btn': {
      height: 48,
      width: 48,
      background: alpha(theme.palette.primary.light, 0.2),
      borderRadius: '4px',
      lineHeight: '0',
      svg: {
        height: 28,
        width: 28,
        color: theme.palette.primary.main
      }
    }
  },
  '& .phone-box': {
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: '8px',
    background: theme.palette.background.paper,
    '& .choose-btn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
      width: 48,
      background: alpha(theme.palette.info.light, 0.2),
      borderRadius: '4px',
      lineHeight: '0',
      svg: {
        height: 28,
        width: 28,
        color: theme.palette.info.main
      }
    }
  },
  '& .form-section': {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '16px',
    padding: '24px',
    background: theme.palette.background.paper
  },
  '.send-btn': {
    width: '100%',
    marginTop: theme.spacing(3)
  },

  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default
  }
}));
export default RootStyled;
