import { MenuItem, Select,Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React ,{useState,useRef}from 'react';
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import BarCharSchool from "../../components/BarChartQuiz";
import BarChartAssignment from "../../components/BarChartAssignment";
import BarChartForCourse from "../../components/BarChartForCourse";
import BarChartLesson from "../../components/BarChartLesson";
import { useParams } from 'react-router-dom';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MultiStepProgressBar from "./ProgressBar";
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import generatePDF, { Resolution, Margin,Options } from "react-to-pdf";
const options: Options = {
  filename: "vizuara.pdf",
  
  
  page: {
     // margin is in MM, default is Margin.NONE = 0
     margin: Margin.SMALL,
     // default is 'A4'
     format: 'letter',
     // default is 'portrait'
     orientation: 'landscape',
  },

  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break, 
  // so use with caution.
  overrides: {
     // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
     pdf: {
        compress: true
     },
     // see https://html2canvas.hertzen.com/configuration for more options
     canvas: {
        useCORS: true
     }
  },
};

const Dashboard = () => {
  const getTargetElement = () => document.getElementById("container");

const downloadPdf = () => generatePDF(getTargetElement, options);
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const { schoolname } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('Citypride Moshi');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };
  const toExit = () => {
    navigate(`/`);
  };
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle={`Welcome to  ${selectedSchool} Vizuara Admin dashboard`} />
      



        <Box>
        <Button
        onClick={downloadPdf}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              marginRight:"16px",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={toExit}
          >
            <ExitToAppIcon sx={{ mr: "10px" }} />
            Logout
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box 
      id='container'
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 12"
          backgroundColor={colors.primary[400]}
          display="flex"

          alignItems="center"
          justifyContent="center"
        >      
              <Box display="flex" alignItems="center" ml="20px">
 
 <Select
   value={selectedSchool}
   onChange={handleSchoolChange}
   variant="outlined"
   sx={{ minWidth: '160px' }}
 >
   <MenuItem value="Citypride Moshi">CityPride Moshi</MenuItem>
   <MenuItem value="Citypride Ravet">CityPride Ravet</MenuItem>
 </Select>
</Box>

          < MultiStepProgressBar/>
          <Button
          variant="contained"
          onClick={toggleDropdown}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
       
            marginRight:'16px'
          }}
        >
            {!showDropdown && (    <ArrowDownwardIcon sx={{ mr: "10px" }} />)}
            {showDropdown && (    <ArrowUpwardIcon sx={{ mr: "10px" }} />)}
          Detailed View
        </Button>
        
        </Box>
   
        {showDropdown && (
              <Box 

gridColumn="span 12"
gridRow="span 7"
height={1000}

backgroundColor={colors.primary[400]}
              // Align Box to the left of its parent
  >
    
    <iframe 
    
 style={{ 
  width: '100%',  // Make iframe fill the entire width of its container
  height: '100%', // Make iframe fill the entire height of its container
  border: 'none'  // Optional: Remove border from iframe
}}
    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQSA9Da0l1hYfXsyLwuEjHpYBSh0fwDfL0h1o6xG1FKy-IWzrpIWZRV7-SGrumS3XjNLaPWIGIYzRkj/pubhtml?widget=true&amp;headers=false"></iframe>
 
  </Box>)}

<Box
 
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Practical completion by teacher
          </Typography>
          <Box height="450px" mt="-20px"  >
            {/* <BarChart isDashboard={true} /> */}
            <BarChartAssignment isDashboard ={true}/>
          </Box>
        </Box>


        <Box
         id="container"
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Lesson Completion by teacher
          </Typography>
          <Box height="450px" mt="-20px" >
            {/* <BarChart isDashboard={true} /> */}
            <BarChartLesson isDashboard ={true}/>
          </Box>
        </Box>
        {/* ROW 3 */}
        
        <Box
         id="container2"
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Quiz completion by students
          </Typography>
          <Box height="450px" mt="-20px">
            {/* <BarChart isDashboard={true} /> */}
            <BarCharSchool selectedSchool={selectedSchool} isDashboard ={true}/>
          </Box>
        </Box>
      </Box>
      <Box
      
  gridColumn="span 4"
  gridRow="span 4"
  backgroundColor={colors.primary[400]}
  mt={'24px'}
  position="relative"  // Ensure parent Box has relative positioning
>
  
</Box>

    </Box>
  );
};

export default Dashboard;
