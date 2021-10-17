import Layout from "components/layout/Layout";
import * as React from 'react';
import { Container,Paper, withStyles, Grid,Link, Button,Box,InputLabel, FormControl,FormLabel, MenuItem, NativeSelect ,TextareaAutosize,TextField , FormControlLabel, Checkbox, Typography  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { collapseClasses } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    maxWidth: "1140px",
    marginBottom: "100px",
    paddingTop: "3rem !important",
  },
  createTitle: {
    fontSize: "42px",
    color: "#fff",
    marginTop: "30px",
    lineHeight:"1.5",
    marginBottom: "0.5rem",
    fontWeight: "500",
  },
  textWhite: {
    color:"#fff",
    marginBottom:"1rem",
    lineHeight:"1.5",
  },
  formFieldText: {
    background: "#000",
    border: "1px solid #7f7f7f",
    height: "45px",
    color: "#fff",
    display: "block",
    width: "100%",
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
    color:"#fff",
    '& div':{
      color:"#fff",
      width:"100%",
      display:"block",
      '& input':{
        width:"100%",
        display:"block",
        padding:0,
        margin:0,
        fontWeight: "300",
        height: "30px",
      }
    }
  },
  formLabel:{
    color: "#fff!important",
    marginBottom: "5px",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  formCon: {
  marginTop: "1.5rem !important",
  display:"block",
  clear:"both",
 },
 formConPra: {
  marginTop: "1.5rem !important",
  display:"block",
  clear:"both",
  
 },
 formnotes:{
  display: "flex",
  alignItems: "center",
  columnGap: "10px",
  color: "#fff",
  fontSize: "14px",
 },
 formConButton:{
   display:"flex",
   color:"#fff",
   alignItems: "center",
   marginBottom: "0.125rem",
   gap: "8px",
   '& span':{
     display:"inline-flex",
     padding: 0,
   },
 },
 formConBtn:{
   display:"block",
 },
 formSubmitBtn: {
  background: "#e01212",
  border: "none",
  color: "#fff",
  padding: "15px 45px",
  borderRadius: "30px",
  marginTop: "40px",
  '&:hover':{
    background: "#e01212",
  },
 },

}));

const About = () => {
 
  const classes = useStyles();
  return (
    <Layout>
      <Container className={classes.customContainer}>
       
      <Box  className={classes.createPageWraper} >
        <Typography variant="h1" className={classes.createTitle}>Create New Character</Typography>
        <p className={classes.textWhite}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <p className={classes.textWhite}>There are many variations of passages of Lorem Ipsum available </p>
        <Box className={classes.createForm}>

        <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
        <FormLabel className={classes.formLabel}>Character Image</FormLabel>
        <input type="file" placeholder="Type Here" className={classes.formFieldText}/>
        </FormControl>
        
        <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
        <FormLabel component="legend" className={classes.formLabel}>Character Name*</FormLabel>
        <TextField  placeholder="Type Here" className={classes.formFieldText}/>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
        <FormLabel component="legend" className={classes.formLabel}>Character Abilities*</FormLabel>
        <TextField  placeholder="Type Here" className={classes.formFieldText}/>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
        <FormLabel component="legend" className={classes.formLabel}> Story*</FormLabel>
        <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Type Here"  className={classes.formFieldText}/>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
        <FormLabel component="legend" className={classes.formLabel}>Character Abilities*</FormLabel>
        <TextField  placeholder="Type Here" className={classes.formFieldText}/>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
        <FormLabel component="legend" className={classes.formLabel}>Level*</FormLabel>
           <NativeSelect inputProps={{ name: 'Level', id: 'uncontrolled-native', }}  className={classes.formFieldText}>
              <option value="">Select</option>
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
              <option value={4}>Level 4</option>
              <option value={5}>Level 5</option>
            </NativeSelect>
          </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} className={classes.formConPra}>
           <p className={classes.formnotes}> <DescriptionOutlinedIcon /> Intellectual Proparty Rights </p>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
        <Box className={classes.formConButton}> 
           <Checkbox  name="Film" className={classes.formConButton} /> Film, Movies, Video, TV Programs </Box>
           <Box className={classes.formConButton}> 
           <Checkbox  name="All"  className={classes.formConButton} /> All</Box>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} className={classes.formConBtn}>
        <Button className={classes.formSubmitBtn} >CREATE MY CHARACTER</Button>
        </FormControl>
        </Box>

      </Box>
      </Container>
    </Layout>

  );
};

export default About;