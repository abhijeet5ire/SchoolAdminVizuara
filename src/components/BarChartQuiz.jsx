import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';

// Example mock data (to be replaced with actual fetched data)
import schoolDataJSON from '../data/SchoolDetails.json';
import courseDataJSON from '../data/CourseDetails.json';

const BarChart = (selectedSchool) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    console.log(selectedSchool)
    // Simulate fetching data; replace with actual fetching logic
    const schoolData = schoolDataJSON[selectedSchool.selectedSchool];
    const quizData = courseDataJSON;

    // Function to calculate quiz completion histogram
    const calculateQuizCompletionHistogram = (schoolData, quizData) => {
      const histogramData = {};

      // Match students from schoolData with quizData based on email
      quizData.forEach(student => {
        const matchingStudent = schoolData.find(s => s.Email === student.email);

        if (matchingStudent) {
          const className = `Class ${matchingStudent.Class}`;

          // Calculate quiz completion percentage
          const quizProgress = student.quiz.split('/');
          const completed = parseInt(quizProgress[0], 10);
          const total = parseInt(quizProgress[1], 10);
          const quizCompletionPercentage = total === 0 ? 0 : (completed / total) * 100;

          // Determine the bin for quiz completion percentage (e.g., 0-20%, 20-40%, etc.)
          const bin = Math.floor(quizCompletionPercentage / 20) * 20;

          if (!histogramData[bin]) {
            histogramData[bin] = 0;
          }

          // Increment count for this bin
          histogramData[bin]++;
        }
      });

      // Convert histogramData into the format expected by ResponsiveBar
      const processed = Object.keys(histogramData).map(bin => ({
        bin: `${bin}% - ${parseInt(bin, 10) + 20}%`, // Format bin labels as needed
        count: histogramData[bin],
      }));

      return processed;
    };
    const fetchData = async () => {
      try {
        const response = await fetch(`api/data/${selectedSchool}`); // Example API endpoint
        const data = await response.json();
        // Process data as need
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // Process data when schoolData or quizData changes
    const processed = calculateQuizCompletionHistogram(schoolData, quizData);
    setProcessedData(processed);
  
  }, [selectedSchool]);

  return (
    <ResponsiveBar
    data={processedData}
    keys={['count']}
    indexBy="bin"
    theme={{
      axis: {
        domain: { line: { stroke: colors.grey[100] } },
        legend: { text: { fill: colors.grey[100], fontSize: 16 } },
        ticks: {
          line: { stroke: colors.grey[100], strokeWidth: 1 },
          text: { fill: colors.grey[100], fontSize: 14 },
        },
      },
      legends: { text: { fill: colors.grey[100], fontSize: 14 } },
    }}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear', min: 0, max: 30 }} // Adjust max value to 30
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'category10' }}
    borderColor={{ from: 'color', modifiers: [['darker', '1.6']] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Quiz Completion Percentage',
      legendPosition: 'middle',
      legendOffset: 32,
      tickLabel: { fill: theme.palette.common.white, fontSize: 12 },
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Number of Students',
      legendPosition: 'middle',
      legendOffset: -40,
      tickValues: [0, 5, 10, 15, 20, 25, 30], // Specify tick values manually up to 30
      tickLabel: { fill: theme.palette.common.white, fontSize: 12 },
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
    barAriaLabel={e => `${e.indexValue}: ${e.formattedValue} classes`}
  />
  );
};

export default BarChart;
