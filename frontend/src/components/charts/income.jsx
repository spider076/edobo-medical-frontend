import { merge } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// mui
import { Card, CardHeader, Box, Tabs, Tab, Skeleton, useMediaQuery, useTheme } from '@mui/material';
// components
import BaseOptionChart from './BaseOptionChart';
import { fCurrency } from 'src/utils/formatNumber';

export default function IncomeChart({ income, commission, isVendor, isLoading }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [seriesData, setSeriesData] = useState('week');
  const pastWeek = [...Array(7).keys()].map((days) =>
    new Date(Date.now() - 86400000 * days).toLocaleString('en-us', {
      weekday: 'short'
    })
  );
  const handleChange = (event, newValue) => {
    setSeriesData(newValue);
  };
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories:
        seriesData === 'week'
          ? pastWeek.reverse()
          : seriesData === 'year'
            ? month
            : [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
                29, 30, 31
              ]
    },
    yaxis: [
      {
        labels: {
          formatter: function (val) {
            return fCurrency(val);
          }
        }
      }
    ]
  });

  return (
    <Card>
      <CardHeader
        title={'Income Report'}
        action={
          <Tabs
            value={seriesData}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            sx={{
              '& .MuiButtonBase-root:not(:last-of-type)': {
                marginRight: '1rem'
              }
            }}
          >
            <Tab value="week" label={'Week'} />
            <Tab value="month" label={'Month'} />
            <Tab value="year" label={'Year'} />
          </Tabs>
        }
        sx={{ flexWrap: 'wrap' }}
      />
      <Box sx={{ mt: 3, mx: 3 }}>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={isMobile ? 260 : 360} sx={{ borderRadius: 2 }} />
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
            </Box>
          </>
        ) : (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              '.apexcharts-canvas': {
                width: '100% !important',
                overflow: 'hidden',
                position: 'relative'
              }
            }}
          >
            <ReactApexChart
              type="bar"
              stack
              series={
                isVendor
                  ? [
                      {
                        name: 'Income',
                        data: income[seriesData]
                      }
                    ]
                  : [
                      {
                        name: 'Income',
                        data: income[seriesData]
                      },

                      {
                        name: 'Commission',
                        data: commission[seriesData]
                      }
                    ].slice(0, !isVendor ? 2 : 1)
              }
              options={chartOptions}
              height={isMobile ? 260 : 400}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
}
IncomeChart.propTypes = {
  data: PropTypes.shape({
    week: PropTypes.array,
    month: PropTypes.array,
    year: PropTypes.array
  }),
  isLoading: PropTypes.bool.isRequired
};
