import PropTypes from 'prop-types';

// mui
import { TableRow, TableCell, TableHead, useTheme } from '@mui/material';
import { createGradient } from 'src/theme/palette';

TableHeadMain.propTypes = {
  headData: PropTypes.array
};

export default function TableHeadMain({ ...props }) {
  const { headData } = props;
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow
        sx={{
          background: createGradient(theme.palette.primary.main, theme.palette.primary.dark)
        }}
      >
        {headData.map((headCell) => (
          <TableCell
            key={Math.random()}
            align={headCell.alignRight ? 'right' : 'left'}
            sx={{
              color: 'common.white',
              bgcolor: 'transparent',
              fontSize: 16,
              py: 2,
              textTransform: 'capitalize'
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
