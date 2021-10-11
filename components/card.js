
import React from "react";
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box,Card,Typography,Button } from "@material-ui/core";
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
  },
  mainSidebar: {
    minHeight: "100vh",
    transition: "margin 0.25s ease-out",
    background: "#000",
    paddingTop: "40px",
    display: "block",
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
    marginLeft: "0.75rem",
    marginRight: "0.75rem",
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
    background: "#000",
    color: "#fff",
    boxShadow: "none",
    border: "none",
    padding: "6px 6px",
    borderRadius: "20px",
    minWidth: "60px",
    fontSize: "12px",
    marginBottom: "10px",
    cursor: "pointer",
    lineHeight: "1.5",
    fontWeight: "300",
    textTransform: "inherit",
    marginRight:"2px",
    '&:hover':{
      background: "#000",
    },
  },
  chFire: {
    background: "#000",
    color: "#fff",
    boxShadow: "none",
    border: "none",
    padding: "6px 6px",
    borderRadius: "20px",
    minWidth: "60px",
    fontSize: "12px",
    marginBottom: "10px",
    cursor: "pointer",
    lineHeight: "1.5",
    fontWeight: "300",
    textTransform: "inherit",
    marginLeft:"2px",
    '&:hover':{
      background: "#000",
    },
},
charLike: {
  color: "#747474",
  display: "flex",
  fontSize: "16px",
  marginBottom: "10px",
  alignItems: "center",
  gap: "5px",
  '& svg':{
    color: "#e01212",
    fontSize: "22px",
    display: "block",
    margin: "0 auto",
    marginRight: "0",
  },
},
charCount: {
  color: "#333333",
  fontSize: "20px",
  fontWeight: "bold",
  display: "flex",
  marginTop: "22px",
  gap: "5px",
  alignItems: "center",
  '& img':{
    width:"20px",
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

        <div id={`ikey${ik}`}>
       <Card variant="outlined" className={classes.itemColCard}>
         <Box  className={classes.charCardImg}>
         <Link className={classes.chaLink} href={`/character/${((data.name)?data.id:'')}`}><img src={(data && data.product_image_url!="")?data.product_image_url:"/images/proimg.jpg"} /></Link>
          </Box>
            <Box  className={classes.charCardContent}>
              <Box  className={classes.charCardLeft}>
              <Link className={classes.chaLink} href={`/character/${((data.name)?data.id:'')}`}><Typography variant="h1" className={classes.chTitle}>{(data.name)?data.name:''}</Typography></Link>
              <p className={classes.chAuthor}>by admin</p>
              <Button variant="contained" className={classes.chLevel}>Level {(data.level_value)?data.level_value:''} </Button>
              <Button variant="contained" className={classes.chFire}>{(data.name_of_class)?data.name_of_class:''}</Button>
              </Box>

              <Box  className={classes.charCardRight}>
              <Box  className={classes.charLike}>
              {(data.name)?data.likes_count:''}
               <Link className={classes.favIcon} href="#"><FavoriteIcon /></Link> 
              </Box>
              <Box  className={classes.charCount}>
                <img src="/images/ethereum.svg"/>
                {(data.price)?data.price:''}
              
              </Box>
              </Box>


            </Box>

         </Card>

        </div>
    );

}