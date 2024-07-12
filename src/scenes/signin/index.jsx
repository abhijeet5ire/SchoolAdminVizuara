import { Container,Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig';
const SignIn = ({ setIsLoggedIn }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      const { id, password,username } = values;
  
      // Reference to the 'school' collection in Firestore
      const schoolsRef = db.collection('school');
  
      // Query Firestore for the school with the provided id
      const querySnapshot = await schoolsRef.get();
      
      if (!querySnapshot.empty) {
        // Assuming there's only one school with this id
        const schoolData = querySnapshot.docs[0].data();
        console.log(schoolData);
        console.log(id)
        // Check if passwords match (in a real scenario, passwords should be securely hashed and stored)
        if (schoolData.password === password&&schoolData.username===username) {
          // Authentication successful
          setIsLoggedIn(true);
          
          navigate(`/dashboard/${schoolData.school}`);
        } else {
          // Incorrect password
          setOpenDialog(true);
          setDialogMessage("Incorrect id or password");
        }
      } else {
        // School not found with the provided id
        setOpenDialog(true);
        setDialogMessage("School not found");
      }
    } catch (error) {
      // Handle errors
      console.error("Error authenticating:", error);
      setOpenDialog(true);
      setDialogMessage("Error authenticating. Please try again later.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="64px"
      bgcolor="background.default"
    >
    <Container maxWidth="sm"> {/* Constrain the width to 'sm' (small) */}
      <Box mt={10} p={3} bgcolor="background.paper" borderRadius={8}>
        <Header title="SIGN IN" subtitle="Please sign in to continue" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={signInSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button type="submit" color="primary" variant="contained">
                  Sign In
                </Button>
              </Box>
            </form>
          )}
        </Formik>

        {/* Dialog for showing error message */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
    </Box>
  );
};

const signInSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

export default SignIn;
