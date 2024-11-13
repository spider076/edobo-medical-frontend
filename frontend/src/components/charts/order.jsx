import { merge } from 'lodash';
import PropTypes from 'prop-types';
// chart
import ReactApexChart from 'react-apexcharts';
// mui
import { Card, CardHeader, Skeleton, Box, useTheme } from '@mui/material';
// components
import BaseOptionChart from './BaseOptionChart';

export default function Order({ data, isLoading }) {
  const theme = useTheme();
  const chartOptions = merge(BaseOptionChart('donut'), {
    labels: ['Pending', 'On th way', 'Delivered', 'Returned', 'Cancelled'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.error.main,
      theme.palette.warning.main
    ],
    stroke: { colors: [theme.palette.background.paper] },
    dataLabels: {
      enabled: false,
      dropShadow: { enabled: false },
      formatter: function (val) {
        return val.toFixed(0) + '%';
      }
    },
    plotOptions: {
      pie: {
        donut: { labels: { show: true }, size: '85%' },
        expandOnClick: true,
        offsetX: 0
      }
    }
  });

  return (
    <Card
      sx={{
        pb: 2,
        '& .apexcharts-canvas': {
          margin: '0 auto'
        }
      }}
    >
      <CardHeader title={'Order Report'} sx={{ pb: 3 }} />
      {isLoading ? (
        <Box maxWidth="365px" width="100%" mx="auto">
          <Skeleton variant="circular" width={190} height={190} sx={{ mx: 'auto', mb: 2.4 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mt: 1,
              px: 3
            }}
          >
            <Skeleton variant="text" sx={{ width: '30%' }} />
            <Skeleton variant="text" sx={{ width: '30%' }} />
            <Skeleton variant="text" sx={{ width: '30%' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',

              mb: 1.6,
              px: 3
            }}
          >
            <Skeleton variant="text" sx={{ width: '30%' }} />
            <Skeleton variant="text" sx={{ width: '30%' }} />
          </Box>
        </Box>
      ) : (
        <ReactApexChart type="donut" series={data} options={chartOptions} width="365px" />
      )}
    </Card>
  );
}
Order.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

// import { merge } from 'lodash';
// import ReactApexChart from 'react-apexcharts';
// // material
// import { useTheme, styled } from '@mui/material/styles';
// import { Card, CardHeader } from '@mui/material';
// // utils
// import { fNumber } from 'src/utils/formatNumber';
// //
// import BaseOptionChart from './BaseOptionChart';

// // ----------------------------------------------------------------------

// const CHART_HEIGHT = 392;
// const LEGEND_HEIGHT = 72;

// const ChartWrapperStyle = styled('div')(({ theme }) => ({
//   height: CHART_HEIGHT,
//   '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
//   '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
//     overflow: 'visible'
//   },
//   '& .apexcharts-legend': {
//     height: LEGEND_HEIGHT,
//     alignContent: 'center',
//     position: 'relative !important',
//     borderTop: `solid 1px ${theme.palette.divider}`,
//     top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
//   }
// }));

// // ----------------------------------------------------------------------

// export default function EcommerceSaleByGender({ data, isLoading }) {
//   const theme = useTheme();
//   console.log(data, 'chart');
//   const CHART_DATA = isLoading ? [] : data;
//   const total = CHART_DATA?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//   const chartOptions = merge(BaseOptionChart(), {
//     labels: ['Pending', 'On th way', 'Delivered', 'Returned', 'Cancelled'],
//     legend: { floating: true, horizontalAlign: 'center' },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         colorStops: [
//           [
//             {
//               offset: 0,
//               color: theme.palette.primary.light
//             },
//             {
//               offset: 100,
//               color: theme.palette.primary.main
//             }
//           ],
//           [
//             {
//               offset: 0,
//               color: theme.palette.secondary.light
//             },
//             {
//               offset: 100,
//               color: theme.palette.secondary.main
//             }
//           ],
//           [
//             {
//               offset: 0,
//               color: theme.palette.success.light
//             },
//             {
//               offset: 100,
//               color: theme.palette.success.main
//             }
//           ],
//           [
//             {
//               offset: 0,
//               color: theme.palette.warning.light
//             },
//             {
//               offset: 100,
//               color: theme.palette.warning.main
//             }
//           ],
//           [
//             {
//               offset: 0,
//               color: theme.palette.error.light
//             },
//             {
//               offset: 100,
//               color: theme.palette.error.main
//             }
//           ]
//         ]
//       }
//     },
//     plotOptions: {
//       radialBar: {
//         hollow: { size: '50%' },
//         dataLabels: {
//           value: { offsetY: 5 },
//           total: {
//             formatter: () => fNumber(total)
//           }
//         }
//       }
//     }
//   });

//   return (
//     <Card>
//       <CardHeader title="Sale By Gender" />
//       <ChartWrapperStyle dir="ltr">
//         <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={310} />
//       </ChartWrapperStyle>
//     </Card>
//   );
// }
