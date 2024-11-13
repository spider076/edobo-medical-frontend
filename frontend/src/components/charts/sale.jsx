import { merge } from 'lodash';
import PropTypes from 'prop-types';
// chart
import ReactApexChart from 'react-apexcharts';
// mui
import { Card, CardHeader, Box, Skeleton } from '@mui/material';
// components
import BaseOptionChart from './BaseOptionChart';

export default function Income({ data, isLoading }) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 0
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    tooltip: {
      y: {
        formatter: (val) => val
      }
    },
    yaxis: {
      opposite: false,
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        }
      }
    }
  });

  return (
    <Card sx={{ pb: 1.5 }}>
      <CardHeader title={'Sales Report'} />

      {isLoading ? (
        <Box mx={3}>
          <Skeleton variant="rectangular" width="100%" height={219} sx={{ borderRadius: 2, mt: 3 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
              mb: 3
            }}
          >
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={[
              {
                name: 'Sales',
                data
              }
            ]}
            options={chartOptions}
            height={260}
          />
        </Box>
      )}
    </Card>
  );
}
Income.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};
