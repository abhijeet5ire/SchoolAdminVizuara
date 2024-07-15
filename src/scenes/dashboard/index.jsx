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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
const printDocument = async () => {
  try {
    const input = document.getElementById('one');
    const secondContent = document.getElementById('two');
    const finalContent = document.getElementById('three');
    var img = new Image();
  img.src = '/assets/1.png';




    // Capture canvas for the first element
    const canvas = await html2canvas(input);
    const pdf = new jsPDF('l', 'mm', 'a3');
    const imgData = canvas.toDataURL('image/png');

    // Create jsPDF instance with portrait orientation



    pdf.addImage(img, 'png',0,0 ,410, 300);
    pdf.addPage();
    // Add image to the first page

  // Calculate dimensions to ensure the entire image fits on the PDF
  const imgWidth = pdf.internal.pageSize.getWidth(); // Width of the PDF page
  const imgHeight = canvas.height * imgWidth / canvas.width; // Maintain aspect ratio

  
  
  // Add "Practical Completion By Teacher" text
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold'); // Set font to bold
  pdf.text('Practical Completion By Teacher', imgWidth / 2, 20, { align: 'center' });
  // Add image to center of the first page
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', (imgWidth - 250) / 2, 40, 250, 250);

    // Add second page with content from secondContent element
    pdf.addPage();
    const secondCanvas = await html2canvas(secondContent);
    const secondImgData = secondCanvas.toDataURL('image/png');
    const secondContentWidth = pdf.internal.pageSize.getWidth();
    const secondContentHeight = secondCanvas.height * secondContentWidth / secondCanvas.width;
    pdf.text('Lesson Completion By Teacher', imgWidth / 2, 20, { align: 'center' });
    pdf.addImage(secondImgData, 'PNG', (imgWidth - 250) / 2, 40, 250, 250);

    // Add final page with content from finalContent element
    pdf.addPage();
    const finalCanvas = await html2canvas(finalContent);
    const finalImgData = finalCanvas.toDataURL('image/png');
    const finalContentWidth = pdf.internal.pageSize.getWidth();
    const finalContentHeight = finalCanvas.height * finalContentWidth / finalCanvas.width;
    pdf.text('Quiz Completion By Teacher', imgWidth / 2, 20, { align: 'center' });
    pdf.addImage(finalImgData, 'PNG', (imgWidth - 250) / 2, 40, 250, 250);
    var img = new Image();
    img.src = '/assets/2.png';
    pdf.addImage(img, 'png',0,0 ,410, 300);

  pdf.addPage();
  var endimg = new Image();
  endimg.src = '/assets/endpage.png';
  pdf.addImage(endimg, 'png',0,0 ,410, 300);
  
    // Save the PDF
    pdf.save("download.pdf");
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Handle errors
  }
};


const Dashboard = () => {
  const getTargetElement = () => document.getElementById("test");

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
        onClick={printDocument}
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          mb: { xs: "10px", md: "0" }, // Margin bottom for smaller screens
          marginRight:'16px'
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
          mb: { xs: "10px", md: "0" }, // Margin bottom for smaller screens
         
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
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            mb: { xs: "10px", md: "0" }, // Margin bottom for smaller screens
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
    id = 'test'
 style={{ 
  width: '100%',  // Make iframe fill the entire width of its container
  height: '100%', // Make iframe fill the entire height of its container
  border: 'none'  // Optional: Remove border from iframe
}}
    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQSA9Da0l1hYfXsyLwuEjHpYBSh0fwDfL0h1o6xG1FKy-IWzrpIWZRV7-SGrumS3XjNLaPWIGIYzRkj/pubhtml?widget=true&amp;headers=false"></iframe>
 
  </Box>)}

          <Box
          id = 'one'
                    gridColumn={{ xs: "span 12", sm: "span 12", md: "span 12",xl:"span 4" }}
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
                    <Box height="500px" mt="-20px"  >
                      {/* <BarChart isDashboard={true} /> */}
                      <BarChartAssignment isDashboard ={true}/>
                    </Box>
                </Box>


        <Box
         id="two"
          gridColumn={{ xs: "span 12", sm: "span 12", md: "span 12",xl:"span 4" }}
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
          <Box height="500px" mt="-20px"  >
            {/* <BarChart isDashboard={true} /> */}
            <BarChartLesson isDashboard ={true}/>
          </Box>
        </Box>
        {/* ROW 3 */}
        
        <Box
         id="three"
          gridColumn={{ xs: "span 12", sm: "span 12", md: "span 12",xl:"span 4" }}
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
          <Typography
            variant="h5"
            fontWeight="600"
         
            sx={{ padding: "30px 30px 0 30px" }}
          >
          
          </Typography>
          <Box height="500px" mt="-20px">
            {/* <BarChart isDashboard={true} /> */}
            <BarCharSchool selectedSchool={selectedSchool} isDashboard ={true}/>
          </Box>
        </Box>

      </Box>
     






    </Box>
  );
};

export default Dashboard;
