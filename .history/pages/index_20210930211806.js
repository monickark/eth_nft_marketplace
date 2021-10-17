import Layout from "components/layout/Layout";

import { Container, Grid, Box, Link , Typography, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Block } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  btn: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },

 
  mainContent:{
    position: "absolute",
    bottom: "100px",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",
    width: "900px",
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  commentBox:{
  width: "100%",
  },
  commentBox:{
    '& p':{
      top: "37px",
      left: "0",
      right: "0",
      position: "absolute",
      textAlign: "center",
      padding: "0",
      margin: "0",
      lineHeight:"1.5",
      [theme.breakpoints.down('sm')]: {
        top: '48px',
      },
    },
    '& span':{
      display:"Block",
    },
  },

  imgabt:{
    width: "900px",
    height: "95px",
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      maxWidth:'100%',
      height: '145px',
    },
  },
  heroBtns:{
    marginTop: "30px",
    textAlign: "center",
  },

  explore:{
  background: "#009933",
  color: "#fff",
  textDecoration: "none",
  padding:"10px 45px",
  borderRadius:"30px",
  lineHeight: "0",
  textTransform: "uppercase",
  fontWeight: "600",
  marginRight: "30px",
  "&:hover": {
    backgroundColor: "#05832f",
    textDecoration: "none",
  },
  },
  create:{
    background: "#e01212",
    color: "#fff",
    textDecoration:"none",
    padding: "10px 45px",
    borderRadius: "30px",
    lineHeight: "0",
    textTransform: "uppercase",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "#c51212",
      textDecoration: "none",
    },
    },
}));

const About = () => {
  const classes = useStyles();
  return (
    <>
    <Layout>
      <Container className={classes.customContainer}>
       
        <Grid container direction="column" alignItems="center" className={classes.mainContent} >
          <Box className={classes.commentBox}>
            
            <img
              src="/images/ballontext.png"
              alt="img"
              className={classes.imgabt}
            />
          <p> Buy/Sell NFT characters that could be used for film/games.<span></span> You can create a story for every character and can sell them to whoever you want like Disney.</p>
          <Box className={classes.heroBtns}>
          <Link className={`${classes.heroBtn} ${classes.explore}`} href="#"> Discover  </Link>
          <Link  className={`${classes.heroBtn} ${classes.create}`}  href="#"> Create </Link> </Box>
          </Box>
      
        </Grid>
      </Container>
    </Layout>
   <style jsx global>
     {`
       body {
        background: url(/images/background.jpg) no-repeat center center fixed;
        background-size: cover;
        overflow: hidden;
       }
      
     `}
   </style>
    </>
  );
};

export default About;