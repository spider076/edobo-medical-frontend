import PropTypes from 'prop-types';
// mui
import { alpha } from '@mui/material/styles';
import { Box, Card, Typography, Button, Skeleton } from '@mui/material';
// icon
import { BsClipboard2DataFill } from 'react-icons/bs';

DailyOrder.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool.isRequired
};

export default function DailyOrder({ data, isLoading }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
        border: (theme) => `1px solid ${theme.palette.secondary.main}!important`
      }}
    >
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">
            {isLoading ? <Skeleton variant="text" width="100px" /> : 'Daily Orders'}
          </Typography>
          <Typography variant="h3">{isLoading ? <Skeleton variant="text" width="100px" /> : data}</Typography>
        </Box>
        <Button
          sx={{
            display: 'block',
            minWidth: 50,
            lineHeight: 0,
            minHeight: 50,
            padding: 0,

            background: (theme) => alpha(theme.palette.secondary.main, 0.9) + '!important'
          }}
          variant="contained"
          color="primary"
        >
          <BsClipboard2DataFill size={24} />
        </Button>
      </>
    </Card>
  );
}
