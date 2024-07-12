import React from 'react';
import { useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';

const BarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Total number of lessons
  const totalPractical = 32;

  // Data for the bar chart
  const data = [{ class: 'Class 6', practical_completed: 7 }];

  return (
    <ResponsiveBar
    data={data}
    keys={['practical_completed']}
    indexBy="class"
    theme={{
      axis: {
        domain: { line: { stroke: colors.grey[100] } },
        legend: { text: { fill: colors.grey[100], fontSize: 16 } }, // Adjust font size for axis legend
        ticks: {
          line: { stroke: colors.grey[100], strokeWidth: 1 },
          text: { fill: colors.grey[100], fontSize: 14 }, // Adjust font size for tick labels
        },
      },
      legends: { text: { fill: colors.grey[100], fontSize: 14 } }, // Adjust font size for legends
    }}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear', min: 0, max: totalPractical }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
    borderColor={{ from: 'color', modifiers: [['darker', '1.6']] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Classes',
      legendPosition: 'middle',
      legendOffset: 32,
      tickLabel: { fill: theme.palette.common.white, fontSize: 12 }, // Adjust font size for axisBottom tick labels
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: `Practical Completed`,
      legendPosition: 'middle',
      legendOffset: -40,
      tickLabel: { fill: theme.palette.common.white, fontSize: 12 }, // Adjust font size for axisLeft tick labels
    }}
    enableLabel={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'top-right',
        direction: 'column',
        justify: false,
        translateX: 30,
        translateY: -48,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [{ on: 'hover', style: { itemOpacity: 1 } }],
      },
    ]}
    barAriaLabel={(e) => `${e.indexValue}: ${e.data.practical_completed} lessons completed`}
  />
  );
};

export default BarChart;
