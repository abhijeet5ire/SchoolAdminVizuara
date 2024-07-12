import React from 'react';
import { useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';

// Sample CSV data (replace with your actual data processing logic)
const mockCSVData = [
  {
    class: 'Class 5',
    students: [
      {
        register_date: '04 Jul 2024 00:00:00',
        display_name: 'Prajval Dnyandev',
        email: 'prajval.dnyandev.chavan@subhadra.vizuara.ai',
        enrolled_course: 'AI Explorers: Introduction to Artificial Intelligence (Class 5-8)',
        course_progress: '30%', // Example data where 30% course progress
        lesson: '0/61',
        assignment: '0/0',
        quiz: '0/12',
      },
      {
        register_date: '05 Jul 2024 00:00:00',
        display_name: 'John Doe',
        email: 'john.doe@example.com',
        enrolled_course: 'AI Explorers: Introduction to Artificial Intelligence (Class 5-8)',
        course_progress: '60%', // Example data where 60% course progress
        lesson: '0/61',
        assignment: '2/5',
        quiz: '8/12',
      },
    ],
  },
  {
    class: 'Class 6',
    students: [
      {
        register_date: '06 Jul 2024 00:00:00',
        display_name: 'Jane Smith',
        email: 'jane.smith@example.com',
        enrolled_course: 'AI Explorers: Introduction to Artificial Intelligence (Class 5-8)',
        course_progress: '90%', // Example data where 90% course progress
        lesson: '0/61',
        assignment: '4/5',
        quiz: '12/12',
      },
    ],
  },
  // Add more data for Class 7 to Class 10 as needed
];

const BarChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Calculate percentage of course progress for each class
  const calculateCourseProgressPercentage = (data) => {
    const classData = {};

    data.forEach((classEntry) => {
      const className = classEntry.class;
      const students = classEntry.students;

      const courseProgressData = students.map((student) => {
        const progress = parseInt(student.course_progress, 10);
        return {
          ...student,
          course_progress_percentage: progress,
        };
      });

      classData[className] = courseProgressData;
    });

    return classData;
  };

  // Process data to include course progress percentage for each class
  const processedData = calculateCourseProgressPercentage(data);

  // Transform processedData into the format required by ResponsiveBar
  const chartData = Object.keys(processedData).map((className) => ({
    class: className,
    ...processedData[className].reduce((acc, student) => {
      acc['course_progress_percentage'] = (acc['course_progress_percentage'] || 0) + student.course_progress_percentage;
      return acc;
    }, {}),
  }));

  // Calculate average course progress percentage for each class
  chartData.forEach((item) => {
    item.course_progress_percentage /= processedData[item.class].length;
  });

  return (
    <ResponsiveBar
      data={chartData}
      keys={['course_progress_percentage']}
      indexBy="class"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear', min: 0, max: 100 }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'set1' }}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
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
        tickLabel: {
          fill: theme.palette.common.white, // Set tick label color to white
        },
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Average Course Progress %',
        legendPosition: 'middle',
        legendOffset: -40,
        tickLabel: {
          fill: theme.palette.common.white, // Set tick label color to white
        },
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={(e) => `${e.indexValue}: ${e.formattedValue}% course progress`}
    />
  );
};

// Example usage:
const BarChartForCourse = () => {
  // Assuming you pass mockCSVData or actual CSV data to BarChart component
  return <BarChart data={mockCSVData} />;
};

export default BarChartForCourse;
