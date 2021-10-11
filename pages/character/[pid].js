import Layout from "components/layout/Layout";
import React from "react";
import Link from 'next/link';
import { Container,Paper, withStyles, Grid,Box ,List ,dense ,ListItem, ListItemText, Button, FormControlLabel, Checkbox, Typography  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useRouter } from "next/router";
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import CardElement from '../../components/card'

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
  characterFirstimg: {
      width: "100%",
      maxWidth: "100%",

  },
  listShareIcons: {
    listStyle: "none",
    display: "flex",
    marginLeft: "auto",
    border: "1px solid #b3b3b3",
    padding: "0px",
    borderRadius: "5px",
    marginTop: "0",
    marginBottom: "1rem",
    '& li':{
    borderLeft: "1px solid #b3b3b3",
    padding: "6px 9px",
    '&:nth-child(1)':{
        borderLeft:"none",
    },
    },
  },
  developersParaOne: {
    color: "#fff",
    display: "flex",
  },
  icoshare: {
      color:"#b3b3b3",
      '& svg':{
          display:"block",
          fontSize:"1.7em",
      }
  },
developersParaTwo: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
},
devloperTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "40px",
    lineHeight: "1.2",
},
devloperBadges: {
    display: "flex",
    marginLeft: "auto",
    mozColumnGap: "15px",
    columnGap: "15px",
    padding: "0",
    alignItems: "center",
    '& li':{
        padding: "0!important;",
        margin: "0!important;",
        display: "block",
        width:"auto!important",
    },
},
favIcon: {
    fontSize: "2.5rem !important",
    color: "#6c757d",
    alignItems: "center",
    display: "flex",
    '& svg':{ 
        fontSize: "2.5rem !important",

    },
},
badgeYellow: {
    background: "#ffcc00",
    color: "#fff",
    fontWeight: "600",
    padding: "10px 20px",
    borderRadius: "30px",
    display: "block",
    lineHeight:"1.5",
    width:"auto!important",
},
badgeGray: {
    background: "#4d4d4d",
    color: "#fff",
    fontWeight: "600",
    padding: "10px 20px",
    borderRadius: "30px",
    display: "block",
    lineHeight:"1.5",
    width:"auto!important",
},
developersParaThree: {
    color: "#b3b3b3",
    fontSize: "18px",
    marginBottom: "1rem",
    lineHeight:"1.5",
},
textInfoOne: {
    listStyle: "none",
    display: "flex",
    columnGap: "30px",
    alignItems: "center",
    paddingLeft: "0px",
    padding: "0",
    marginBottom: "14px",
    '& li':{
        color: "#b3b3b3",
        margin: "0",
        lineHeight: "20px",
        padding: "0",
        display: "flex",
        '& svg':{
            marginRight: "5px",
        },
        '& img':{
            marginRight: "5px",
        },
    },
},
developersParaFour: {
    marginTop: "20px",
},
pPrice: {
    color: "#fff",
    fontSize: "35px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
    '& span':{
        fontSize: "14px",
        fontWeight: "400",
        color: "#bababa",
    },
},
descBtn: {
background: "#ed1c24",
color: "#fff",
padding: "8px 15px",
display: "block",
textAlign: "center",
boxShadow: "1px 1px 4px 1px #7c0f17",
borderRadius: "4px",
textTransform: "uppercase",
fontWeight: "bold",
fontSize: "14px",
textDecoration: "none!important",
},
descBtns: {
    color: "#b3b3b3",
    display: "flex",
    marginTop: "15px",
    '& a':{ 
        background: "#ed1c24",
        color: "#fff",
        padding: "8px 15px",
        display: "block",
        textAlign: "center",
        boxShadow: "1px 1px 4px 1px #7c0f17",
        borderRadius: "4px",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "14px",
        textDecoration: "none!important",
    },
    '& li':{
        margin: "0",
        padding: "0",
        paddingRight: "15px",
        width:"auto",
    }
},
pPricce: {
    color: "#b3b3b3",
},
developersParaFive:{
color:"#fff",
'& p':{
    color: "#b3b3b3",
    fontSize: "18px",
    marginBottom: "1rem",
},
},
moreProducts:{
    marginTop: "25px",
},
moreProductsTitle:{
    width: "100%",
    textAlign: "center",
    borderBottom: "1px solid #fff",
    lineHeight: "0.1em",
    margin: "10px 0 20px",
    fontSize: "2rem",
    color: "#fff",
    '&  span':{
    padding: "0 10px",
    color: "#fff",
    background: "#000",
    },
},
moreProductsSliderSection: {
    marginTop: "15px",
    marginBottom: "40px",
    color:"#fff",
    position:"relative",
    width:'100%',
    [theme.breakpoints.down('sm')]: {
        padding: '25px',
      },
},
customContainer: {
    maxWidth: "1140px",
    paddingTop: "0.5rem !important",
    padding: "0.75rem",
},
charMainInfo:{
marginLeft:"-0.75rem",
marginRight:"-0.75rem",
display:"flex",
[theme.breakpoints.down('sm')]: {
    display: 'block',
  },
},
charMainImg: {
paddingLeft:"0.75rem",
paddingRight:"0.75rem",
[theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    flexBasis: '100%',
  },
},
charContent: {
paddingLeft:"0.75rem",
paddingRight:"0.75rem",
[theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    flexBasis: '100%',
  },
},
moreProducts: {
    '& li':{
    background:"#000",
}
}
}));

const About = () => {
    
  const classes = useStyles();
   const router = useRouter();

  const [cdata, setCdata]= React.useState({})
  const [items, setItems]= React.useState([])

  React.useEffect(()=>{
    if(!router.isReady) return;
    const { pid } = router.query;
    if(router.query.pid) {
      getProductData(router.query.pid);

      getOtherProductData(router.query.pid);
        //'https://laravel.worldwidetournaments.com/api/v1/products/36'
    }
    // codes using router.query

}, [router.isReady]);

const getProductData = async(pid) => {
  let authToken = localStorage.getItem('userAuthToken');
  let API_URL = 'https://laravel.worldwidetournaments.com/api/v1/';
 // e.preventDefault();
  //  setLoginError('');
    const headers = {
        "Content-Type" : `multipart/form-data`,
        "Authorization":"Bearer " + authToken
    };

try { 
    let result = await axios( {
        method:'get',
        url: 'products/'+pid,
        baseURL: API_URL,
        headers: headers,
    } );

    let response = (result)?result.data:'';
    console.log(response);
    if(response && response.results && response.results.character){
        console.log("Fetched Successful");
        var characterdata = response.results.character;
        console.log(characterdata);
        setCdata(characterdata)
    } else {
        // router.push('/', undefined, { shallow: true });
    }
   } catch (err) {
    console.log(err);
     //router.push('/', undefined, { shallow: true });
   }
}

const getOtherProductData = async(pid) => {
  let authToken = localStorage.getItem('userAuthToken');
  let API_URL = 'https://laravel.worldwidetournaments.com/api/v1/';
 // e.preventDefault();
  //  setLoginError('');
    const headers = {
        "Content-Type" : `multipart/form-data`,
        "Authorization":"Bearer " + authToken
    };

try { 
    let result = await axios( {
        method:'get',
        url: 'products',
        baseURL: API_URL,
        headers: headers,
    } );

    let response = (result)?result.data:'';
    console.log(response);
    if(response && response.results && response.results.characters){
        console.log("Fetched Successful");
        var characterdata = response.results.characters;
        //console.log(characterdata);
        //setCdata(characterdata)
        var itemdata = [];
        characterdata.forEach(function(v) {
           var idata =  <CardElement data={v} />
         // <div><img src={v.product_image_url} onDragStart={handleDragStart} role="presentation" /><div>{v.name}</div></div>;
          itemdata.push(idata);
        })
        setItems(itemdata);
        console.log(itemdata);
    } else {
        // router.push('/', undefined, { shallow: true });
    }
   } catch (err) {
    console.log(err);
     //router.push('/', undefined, { shallow: true });
   }
}

const handleDragStart = (e) => e.preventDefault();

// const items = [
//   <img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" />,
//   <img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" />,
//   <img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" />,
// ];

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
};

// const items = [
//     <div><img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" /><div>Hello world</div></div>,
//     <img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" />,
//     <img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" />,
//     <img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" />,
//     <img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" />,
//     <img src="/images/proimg.jpg" onDragStart={handleDragStart} role="presentation" />,

// ];


  return (
    <>
    <Layout>
      <Container className={classes.customContainer}>
      <Box className={classes.cWraper}> 
   
       <Box   className={classes.charMainInfo}>
            <Grid item xs={6} className={classes.charMainImg}>
               <img src={(cdata && cdata.product_image_url!="")?cdata.product_image_url:"/images/proimg.jpg"} alt="test" className={classes.characterFirstimg}/>
            </Grid>

            <Grid item xs={6} className={classes.charContent}>
                <Box  className={classes.developersParaOne} > 
                <List className={classes.listShareIcons}>

                <ListItem >
                <Link className={classes.icoshare} href="#"><ReplayOutlinedIcon /></Link> 
                </ListItem>

                <ListItem >
                <Link className={classes.icoshare} href="#"><FlagIcon /></Link> 
                </ListItem>
                <ListItem >
                <Link className={classes.icoshare} href="#"><ShareIcon /></Link> 
                </ListItem>
                </List>
                </Box>
                <Box  className={classes.developersParaTwo} >
                <Typography variant="h1" className={classes.devloperTitle}>{(cdata && cdata.name)?cdata.name:''}</Typography>

                <List className={classes.devloperBadges}>
                <ListItem >
                <Box className={classes.favIcon} ><FavoriteIcon /></Box> 
                </ListItem>

                <ListItem >
                <Box className={`${classes.badgeYellow} ${classes.dBadges}`} >{(cdata && cdata.name_of_class)?cdata.name_of_class:''}</Box> 
                </ListItem>
                <ListItem >
                <Box className={`${classes.badgeGray} ${classes.dBadges}`} >Level {(cdata && cdata.level_value)?cdata.level_value:''} </Box> 
                </ListItem>
                </List>

                </Box>

                <Box  className={classes.developersParaThree} >
                 <p>{(cdata && cdata.description)?cdata.description:''}</p>

                </Box>

                <Box  className={classes.developersParaFour} >
                    <Box className={classes.gallaryImgsTextInfo}>

                    <List className={classes.textInfoOne}>
                    <ListItem >
                       <VisibilityIcon />  6 Views
                    </ListItem>

                    <ListItem >
                       <LocalFireDepartmentIcon /> Spcial Powers: {(cdata && cdata.special_powers)?cdata.special_powers:''}
                    </ListItem>

                    </List>
                    <List className={classes.textInfoOne}>
                    <ListItem >
                       <FavoriteIcon />  2 Favorites
                    </ListItem>

                    <ListItem >
                       <img src="/images/limited.svg" />  Only 100,000 ever made
                    </ListItem>

                    </List>

                    </Box>
                </Box>
                <Box  className={classes.developersParaFour} >
                    <Box className={classes.pPrice}> 
                    <img src="/images/ethereum.svg" />  {(cdata && cdata.price)?cdata.price:''} <span>($0)</span>
                    
                    </Box>
                    <List className={classes.descBtns}>
                      <ListItem >
                        <Link className={`${classes.descBtn} ${classes.buynowBtn}`} href="#">Buy Now</Link> 
                      </ListItem>
                      <ListItem >
                        <Link className={`${classes.descBtn} ${classes.addfaceBtn}`} href="#">Add Your Face</Link> 
                      </ListItem>
                      <ListItem >
                        <Link className={`${classes.descBtn} ${classes.makeOffer}`} href="#">Make Offer</Link> 
                      </ListItem>
                    </List>
                </Box>
                <Box  className={classes.developersParaFive} >
                    <p> <img src="/images/verifiedbadge.svg" /></p>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </p>


                </Box>
                
               
            </Grid>

         
        </Box>
        <Grid container  className={classes.moreProducts}>
        <Typography variant="h1" className={classes.moreProductsTitle}><span>More From This Collection</span></Typography>
        <Box className={classes.moreProductsSliderSection}>
        


         <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        autoPlay="false"
        autoPlayInterval="3000"
        disableDotsControls="true"
        controlsStrategy="alternate"
        infinite="false"
    />
        </Box>

        </Grid>
      </Box>
        
      </Container>
    </Layout>
  <style jsx global>
  {`
    .alice-carousel__next-btn, .alice-carousel__prev-btn {
        position: absolute;
        top: 43%;
        width: 30px;
        height: 30px;
        left: -30px;
    }
    
    .alice-carousel__next-btn p.alice-carousel__next-btn-item, .alice-carousel__prev-btn p.alice-carousel__prev-btn-item {
        background: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #000;
        height: 30px;
        width: 30px;
        opacity: .5;
        font-weight: bold;
    }
    .alice-carousel__next-btn {right: -30px!important;      left: auto;}
    @media only screen and (max-width: 800px) {
        .alice-carousel__next-btn {right: -20px!important;      left: auto;}
    }
  `}
</style>
</>
  );
};

export default About;