import PropTypes from 'prop-types';
// mui
import { alpha } from '@mui/material/styles';
import { Box, Card, Typography, Button, Skeleton } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';

DailyEaring.propTypes = {
  title: PropTypes.string.required,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool.isRequired,
  isAmount: PropTypes.bool,
  icon: PropTypes.any,
  color: PropTypes.string.isRequired
};

export default function DailyEaring({ title, value, isLoading, isAmount, icon, color }) {
  const isHex = color.includes('#');
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        bgcolor: (theme) => alpha(isHex ? color : theme.palette[color].main, 0.2),
        border: (theme) => `1px solid ${isHex ? color : theme.palette[color].main}!important`
      }}
    >
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">{isLoading ? <Skeleton variant="text" width="100px" /> : title}</Typography>
          <Typography variant="h3">
            {isLoading ? <Skeleton variant="text" width="100px" /> : isAmount ? fCurrency(value) : value}
          </Typography>
        </Box>
        <Button
          sx={{
            display: 'block',
            minWidth: 54,
            lineHeight: 0,
            minHeight: 54,
            padding: 0,
            borderRadius: '50%',
            background: (theme) => alpha(isHex ? color : theme.palette[color].main, 0.9) + '!important'
          }}
          variant="contained"
          color="primary"
        >
          {icon}
        </Button>
      </>
    </Card>
  );
}
