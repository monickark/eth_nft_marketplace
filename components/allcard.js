
import React from "react";
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container,Paper, withStyles, Grid, Button, Divider, Card, Box, FormControlLabel, Checkbox, Typography  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  dFlex: {
    display: "flex !important",
    overflowX: "hidden",
    width: "100%",
  },
  pageContentWrapper: {
    background: "#333333",
    paddingTop: "10px",
    paddingLeft: ".75rem",
    paddingRight: ".75rem",
    color: "#fff",
    width:"100%",
    [theme.breakpoints.down('sm')]: {
      paddingTop: '40px',
    },
  },
  mainSidebar: {
    minHeight: "100vh",
    transition: "margin 0.25s ease-out",
    background: "#000",
    paddingTop: "40px",
    display: "block",
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
},
  sidebarHeadings: {
    color: "#fff",
    textAlign: "center",
    fontSize: "18px",
    margin: "20px 0px",
    fontWeight: "500",
    lineHeight: "1.2",
  },
  sidebarBtns: {
    color: "#fff",
    width: "232px",
    display: "block",
    clear: "both",
    textAlign: "center",
    background: "#333333",
    padding: "14px 20px 14px",
    borderRadius: "30px",
    margin: "0px 20px 10px",
    lineHeight: "1.5",
    textTransform: "inherit",
    '&:hover':{
      color: "#fff",
      background: "#333333",
    }
  },
  customDivider: {
    width: "80%",
    margin: "auto",
    background: "#fff",
    marginTop: "1rem!important",
    opacity: ".25",
    display: "block",
    clear: "both",
  },
  charCardImg: {
    color:"#000",
    '& img':{
      width:"100%",
      maxWidth:"100%",

    }
  },
  sidebarIcon: {
    color: "#fff",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "0.875rem 1.25rem",
    fontSize: "1.2rem",
    paddingBottom:"0px",
    paddingTop: "15px",
    
    '& svg':{
      color:"#fff",
      fontSize:"22px",

    }
  },
  filterSort: {
    display: "flex",
    color: "#fdfdfd",
    alignItems: "center",
    columnGap: "20px",
    width: "100%",
    lineHeight: "1.5",
    paddingBottom: "3px",
    paddingTop: "3px",
  },
  sortBy: {
    marginLeft: "auto",
    paddingRight: "30px",
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
    whiteSpace: "nowrap",
  },
  itemColCard: {
    border: "1px solid #ccc",
    padding: "15px 15px",
    borderRadius: "5px",
    marginBottom: "20px",
    background: "#fff",
  },
  charCardImg: {
    '& img':{
    width: "100%",
    borderRadius: "5px",
  },
  },
  charCardContent: {
    marginTop: "10px",
    display: "flex",
    padding: "0px 10px",
  },
  charCardRight:{
    marginLeft: "auto",
    textAlign: "right",
  },
  chTitle: {
    fontSize: "18px",
    marginBottom: "0px",
    color: "#333333",
    '&:hover':{
      cursor: "pointer",
    },
  },
  chAuthor:{
    fontSize: "10px",
    color: "#898989",
    marginBottom: "1rem",
    marginTop: "0",
  },
  chLevel: {
  background:"#000",
  color: "#fff",
  boxShadow: "none",
  border: "none",
  padding: "5px 20px",
  borderRadius: "20px",
  minWidth: "100px",
  fontSize: "14px",
  marginBottom: "10px",
  lineHeight: "1.4",
  '&:hover':{
    background:"#000",
  },
  },
  chFire: {
    background:"#ff3d3d",
    color: "#fff",
    boxShadow: "none",
    border: "none",
    padding: "5px 20px",
    borderRadius: "20px",
    minWidth: "100px",
    fontSize: "14px",
    marginBottom: "10px",
    lineHeight: "1.4",
    '&:hover':{
      background:"#ff3d3d",
    },
},
charLike: {
  color: "#747474",
  display: "inline-block",
  marginBottom: "10px",
  fontSize: "18px",
  '& svg':{
    color: "#e01212",
    fontSize: "35px",
    display: "block",
    margin: "0 auto",
    marginRight: "0",
  },
},
charCount: {
  display: "block",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
  '& img':{
    width:"20px",
    display: "block",
    marginLeft: "auto",
  },
},
filtersDataRow: {
  marginLeft: "-0.75rem",
  marginRight: "-0.75rem",
},
itemCol: {
paddingLeft: "0.75rem",
paddingRight: "0.75rem",
},
}));

export default function CardElement({ data,ik }) { //({ data, currentAddress, type }) {
    let rowCount = 1;
    data = (data === undefined) ? [] : data;


  const classes = useStyles();

    return (

<Grid item xs={12} sm={3} md={3} lg={3} className={classes.itemCol}>
<Card variant="outlined" className={classes.itemColCard}>
          <Box  className={classes.charCardImg}>
            <Link className={classes.chaLink} href={data.image}> 
            <img src={(data && data.image!="")?data.image:"test"} />
            </Link>
          </Box>
          <Box  className={classes.charCardContent}>
            <Box  className={classes.charCardLeft}>
              <Link className={classes.chaLink} href={`/character/${((data.name)?data.tokenId:'')}`}> 
              <Typography variant="h1" className={classes.chTitle}>{(data.name)?data.name:''}</Typography>
              </Link>
              <p className={classes.chAuthor}>by admin</p>
              <Button variant="contained" className={classes.chLevel}>Level {(data.level_value)?data.level_value:''} </Button>
              <Button variant="contained" className={classes.chFire}>{(data.name_of_class)?data.name_of_class:''}</Button>
            </Box>

            <Box  className={classes.charCardRight}>
              {/* <Box  className={classes.charLike}>
              {(data.name)?data.likes_count:''}
               <Link className={classes.favIcon} href="#"><FavoriteIcon /></Link> 
              </Box> */}
              <Box  className={classes.charCount}>
                  {(data.tokenId)?data.tokenId:''}
              </Box>
              <Box  className={classes.charCount}>
                  <img src="/images/ethereum.png"/>
                  {(data.price)?data.price:''}
              </Box>
              {/* <Box  className={classes.charCount}>
                  ID: {(data.tokenId)?data.tokenId:''}
              </Box> */}
          </Box>
        </Box>

         </Card>

         </Grid>
 );

}