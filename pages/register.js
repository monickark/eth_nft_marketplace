import Layout from "components/layout/Layout";
import * as React from 'react';

import { useRouter } from 'next/router';
import { Container,Paper, withStyles, Grid, Button, FormControlLabel, Checkbox, Typography  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Face, Fingerprint } from '@material-ui/icons'
import { Block } from "@material-ui/icons";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box } from "@mui/system";
import axios from 'axios';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  btn: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      color: theme.palette.primary.main,
    },
    formItemsRow: { 
      color:"#fff",

    },
  },
  loginPage: {
    position:"relative",
    display: "flex",
    flexDirection:"column",
    pointerEvents: "auto",
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,.2)",
    borderRadius: ".3rem",
    outline: "0",
    width: "50%",
    margin: "0 auto",
    marginTop: "5%",
    padding: "1rem",
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginTop: '10%',
    },
  },
  formHeading: {
    display:"block",
    width: "100%",
    textAlign: "center",
    color: "#333333",
    fontSize: "22px",
    marginBottom: "20px",
    marginTop: "20px",
    fontWeight: "500",
    lineHeight: "1.2",
  },
 
  loginForm: {
    display:"block",
    width: "100%",
  },
  formForgotpassword:{
    color:"#000",
  },
  formSubmitBtn: {
    background: "#e01212",
    color: "#fff",
    textDecoration: "none",
    padding: "25px 65px 25px",
    borderRadius: "30px",
    lineHeight: "0",
    textTransform: "uppercase",
    "&:hover": {
      color: "#000",
      background: "#e01212",
    },
  },
  formOr: {
    position: "relative",
    padding: "10px",
    background: "#fff",
    display: "inline-block",
    zIndex: "1",
    lineHeight: "10px",
    color: "#b3b3b3",
    fontSize: "17px",
    margin: "0",
  },
  afterFormCon: {
    display:"block",
    width: "100%",
  },
  formRegisterlinkP: {
    color: "#b3b3b3",
    fontSize: "18px",
    fontWeight: "normal",
    textAlign: "center",
  },
  formRegisterlink: {
    color: "#2081e2",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      
    },
  },
  formForgotpassword: {
    color: "#9A9EA9",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      color:"#2081e2",
    },
  },
  orPra: {
    width: "100%",
    textAlign: "center",
    position: "relative",
    marginTop: "20px",
    marginBottom: "20px",
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      height: "0.5px",
      background: "#b6b6b6",
      zIndex: "0",
      bottom: "0",
      left: "0",
      right: "0",
      margin: "0 auto",
      },
  },
  keepSignUp: {
    margin:"8px",
    color: "#9A9EA9",
    fontWeight: "normal",
  },
  customContainer: {
    maxWidth:"100%",
    padding: "0",
  },
  formItemsInputs: {
    border:"none!important",
    '& fieldset':{
      fontSize: "17px",
      height: "55px",
      width: "100%",
      padding: "6px 0 6px 50px",
      margin: "0 auto",
      border: "2px solid #eee",
      borderRadius: "5px",
      boxShadow: "none",
      outline: "none",
      display: "block",
      fontWeight: "400",
      lineHeight: "1.5",
      color: "#212529",
    },
    '&:hover fieldset':{
      borderColor: "#eee!important",
      },
  },

  iconcolor: {
    color:"#B3B3B3",
  },

}));

const About = () => {

  const router = useRouter();
  const [values, setValues] = React.useState({
    userEmail: '',
    password: '',
    cpassword: '',
    userFullName: '',
    userPhone:'',
    showPassword: false,
    showCPassword: false,
  });


  const [fullNameError,setFullNameError] =  React.useState('');
  const [emailError,setEmailError]  = React.useState('');
  const [passwordError,setPasswordError] =  React.useState('');
  const [conPasswordError,setConPasswordError]  = React.useState('');
  
  const [phoneError,setPhoneError]  = React.useState('');
  

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleClickShowCPassword = () => {
    setValues({
      ...values,
      showCPassword: !values.showCPassword,
    });
  };
  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };

  const handleSignup = async(e) =>{
  let API_URL = 'https://laravel.worldwidetournaments.com/api/v1/';
      e.preventDefault();
        setFullNameError('')
        setEmailError('')
        setConPasswordError('')
        setPasswordError('')
        setPhoneError(' ')

        const headers = {
            "Content-Type" : `multipart/form-data`
        };

        let data = new FormData();
        data.append( 'email', values.userEmail );
        data.append( 'password', values.password );
        data.append( 'password_confirmation', values.cpassword );
        data.append( 'full_name', values.userFullName );
        data.append( 'phone', values.userPhone );
try {
        let result = await axios( {
            method:'post',
            url: 'signup',
            baseURL: API_URL,
            data: data,
            headers: headers,
        } );

        let response = (result)?result.data:'';

        if(response.success){
            console.log("Login Successful");
            var login_token = response.results.token;
            localStorage.setItem('userAuthToken',login_token);

            router.push('/characters', undefined, { shallow: true });
        } else {
            console.log("Failed to Login");
        }
         } catch (err) {
          if(err.response && err.response.data) {
            var geterrors = err.response.data.errors;
            if(geterrors.full_name) {
               setFullNameError(geterrors.full_name)
            }
            if(geterrors.email) {
               setEmailError(geterrors.email)
            }
            if(geterrors.password) {
               setPasswordError(geterrors.password)
            }
            if(geterrors.password_confirmation) {
               setConPasswordError(geterrors.password_confirmation)
            }
            if(geterrors.phone) {
              setPhoneError(geterrors.phone)
           }
            console.log(geterrors);

          }
  }
  }

  
  const classes = useStyles();
  return (
    <Layout>
      <Container className={classes.customContainer}>
       
        <Grid container direction="column" alignItems="center" className={classes.loginPage} >
        <Typography variant="h5" className={classes.formHeading}>
        Sign Up
        </Typography>
        <Box className={classes.loginForm}>


             <Grid container  className={classes.formItemsRow}>

                <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
                        <OutlinedInput
                          id="standard-adornment-amount"
                          className={classes.formItemsInputs}
                          value={values.userFullName}
                          
                          onChange={handleChange('userFullName')}
                          placeholder="Full Name"
                          startAdornment={<InputAdornment className={classes.iconcolor} position="start"> <AccountCircleOutlinedIcon /></InputAdornment>}
                          
                        />
                        <FormHelperText id="component-error-text1" style={{color:'red'}}>{fullNameError}</FormHelperText>
                      </FormControl> 
                  </Grid>

                   <Grid container  className={classes.formItemsRow}>

                  <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
                          <OutlinedInput
                            id="standard-adornment-amount"
                            className={classes.formItemsInputs}
                            value={values.userEmail}
                            
                            onChange={handleChange('userEmail')}
                            placeholder="Email"
                            startAdornment={<InputAdornment className={classes.iconcolor} position="start"> <MailOutlineIcon/></InputAdornment>}
                            
                          />

                        <FormHelperText id="component-error-text2" style={{color:'red'}}>{emailError}</FormHelperText>
                        </FormControl>

                  </Grid>

                    <Grid container  className={classes.formItemsRow}>
                    <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
                        <OutlinedInput
                          id="standard-adornment-password"
                          className={classes.formItemsInputs}
                          placeholder="Password"
                          type={values.showPassword ? 'text' : 'password'}
                          startAdornment={<InputAdornment position="start" className={classes.iconcolor}> <LockOutlinedIcon /></InputAdornment>}
                          value={values.password}
                          onChange={handleChange('password')}
                          endAdornment={
                            <InputAdornment  position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                className={classes.iconcolor}
                              >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />

                        <FormHelperText id="component-error-text3" style={{color:'red'}}>{passwordError}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid container  className={classes.formItemsRow}>
                    <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
                        <OutlinedInput
                          id="standard-adornment-cpassword"
                          className={classes.formItemsInputs}
                          placeholder="Confirm Password"
                          type={values.showCPassword ? 'text' : 'password'}
                          startAdornment={<InputAdornment position="start" className={classes.iconcolor}> <LockOutlinedIcon /></InputAdornment>}
                          value={values.cpassword}
                          onChange={handleChange('cpassword')}
                          endAdornment={
                            <InputAdornment  position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCPassword}
                                onMouseDown={handleMouseDownCPassword}
                                className={classes.iconcolor}
                              >
                                {values.showCPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />

                        <FormHelperText id="component-error-text4" style={{color:'red'}}>{conPasswordError}</FormHelperText>
                      </FormControl>

                      
                    </Grid>
                    
               <Grid container  className={classes.formItemsRow}>

                  <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
                          <OutlinedInput
                            id="standard-adornment-amount"
                            className={classes.formItemsInputs}
                            value={values.userPhone}
                            onChange={handleChange('userPhone')}
                            placeholder="Phone"
                            startAdornment={<InputAdornment className={classes.iconcolor} position="start"> <PhoneIcon /></InputAdornment>}
                            
                          />
                          <FormHelperText id="component-error-text4" style={{color:'red'}}>{phoneError}</FormHelperText>
                     
                        </FormControl> 

                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button onClick={handleSignup} className={classes.formSubmitBtn} >Sign Up</Button>
                    </Grid>
               
            </Box>
            <Box className={classes.afterFormCon}>
            <Box className={classes.orPra}>  <p className={classes.formOr}>or</p> </Box>
              <p className={classes.formRegisterlinkP}>Already have an account ?  <Link  href="/login" className={classes.formRegisterlink}> Sign In now </Link></p>

            </Box>
      
        </Grid>
      </Container>
    </Layout>

  );
};

export default About;