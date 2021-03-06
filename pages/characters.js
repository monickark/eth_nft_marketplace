import Layout from "components/layout/Layout";
import * as React from 'react';
import { Container,Paper, withStyles, Grid,Link, Button, Divider, Card, Box, FormControlLabel, Checkbox, Typography  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from "next/router";
import CardElement from '../components/allcard';

import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
//import {apiBaseUrl} from '../config/config';
import { getAllCharacters } from '../api/Alldata';

import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import NFT from '../build/contracts/NFT.json';
import NFTMarket from '../build/contracts/NFTMarket.json';

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
  },
},
filtersDataRow: {
  marginLeft: "-0.75rem",
  marginRight: "-0.75rem",
  display: "flex",
  flexWrap: "wrap",
},
itemCol: {
paddingLeft: "0.75rem",
paddingRight: "0.75rem",
},
}));

const About = () => { 

  const classes = useStyles();
  const router = useRouter();
  //let uniqueArray =[];
  const [items, setItems] = React.useState([])
  const [allitems, setAllitems] = React.useState([])
  const [isCleared, setIsCleared] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [specialFilter, setSpecialFilter] = React.useState([]);

  const [nfts, setNfts] = useState([])
  const [agrFiltersType, setAgrFiltersType] = React.useState([]);
  const [agrFiltersLevel, setAgrFiltersLevel] = React.useState([]);

  React.useEffect(()=>{
    if(!router.isReady) return;
    loadNFTs()
    getOtherProductData();

}, [router.isReady]);


const getOtherProductData = async() => {
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
        //var itemdata = [];
        // characterdata.forEach(function(v) {
        //    var idata =  <CardElement data={v} />
        //  // <div><img src={v.product_image_url} onDragStart={handleDragStart} role="presentation" /><div>{v.name}</div></div>;
        //   itemdata.push(idata);
        // })
        setItems(characterdata);
        setAllitems(characterdata);
        //console.log(itemdata);
    } else {
        // router.push('/', undefined, { shallow: true });
    }
   } catch (err) {
    console.log(err);
     //router.push('/', undefined, { shallow: true });
   }
}

const filterData = async (stype,tvalue) => {
  setIsCleared(false);
  if(allitems && allitems.length) {
    var ndata = [];
   
        if(stype=="utype") {
          allitems.forEach(function(v,k) {
              if(v.name_of_class==tvalue) {
                ndata.push(v);
              }
          })
        } else {
          allitems.forEach(function(v,k) {
            if(v.level_value && Number(v.level_value)==tvalue) {
              ndata.push(v);
            }
          })
        }
        setItems(ndata);
  }
}

const clearSearch = () => {
  setIsCleared(true);
  setItems(allitems);
}


async function loadNFTs() {
  console.log("inside loadNFT");
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = await new ethers.providers.Web3Provider(connection)    
  const signer = await provider.getSigner()
  const network = await provider.getNetwork()
  console.log("network : "+ network.chainId);
  console.log("Signer : "+ signer);
  console.log("Address : "+   NFT.networks[network.chainId].address);
  console.log("ABI : "+ NFT.abi); 
    
  const marketContract = new ethers.Contract(NFTMarket.networks[network.chainId].address, NFTMarket.abi, signer)
  const tokenContract = new ethers.Contract(NFT.networks[network.chainId].address, NFT.abi, provider)
  const data = await marketContract.fetchMarketItems()
  
  const items = await Promise.all(data.map(async i => {
    const tokenUri = await tokenContract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenUri)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item = {
      price,
      tokenId: i.tokenId.toNumber(),
      seller: i.seller,
      owner: i.owner,
      image: meta.data.image,
      name: meta.data.name,
      ability: meta.data.ability
    }
    console.log("item page: " + JSON.stringify(item));
    return item
  }))
  setNfts(items)
  // setLoadingState('loaded') 
}

  return (
    <Layout>
      <Box className={classes.customContainer2}>
       <Box  className={classes.dFlex}>

         <Box  className={classes.mainSidebar}>
            <Box className={classes.sidebarIcon}> <FilterAltIcon />   Filter <span onClick={clearSearch} 
            style={{display:(isCleared)?'none':'block'}}>X</span></Box>
              <Box className={classes.filterForm}>
              <Divider className={classes.customDivider} />
              <Typography variant="h6" className={classes.sidebarHeadings}> Special Abilities </Typography>
              <Button variant="contained" className={classes.sidebarBtns} onClick={() => filterData('utype','partia')}>Partia</Button>
              <Button variant="contained" className={classes.sidebarBtns}  onClick={() => filterData('utype','asdasd')}>Asdasd</Button>

              <Divider className={classes.customDivider}  />
              <Typography variant="h6" className={classes.sidebarHeadings}> Level </Typography>
              <Button onClick={() => filterData('level',1)} variant="contained" className={classes.sidebarBtns} >Level 1</Button>
              <Button onClick={() => filterData('level',2)} variant="contained" className={classes.sidebarBtns}>Level 2</Button>
              <Button onClick={() => filterData('level',3)} variant="contained" className={classes.sidebarBtns}>Level 3</Button>
              <Button onClick={() => filterData('level',4)} variant="contained" className={classes.sidebarBtns}>Level 4</Button>
              <Button onClick={() => filterData('level',5)} variant="contained" className={classes.sidebarBtns}>Level 5</Button>

              </Box>
         </Box>

         <Box  className={classes.pageContentWrapper}>

          <Box  className={classes.filterSort}>
            <Box  className={classes.avaliableChar}>  {(nfts.length)}  Characters Avaliable </Box>
            <Box  className={classes.sortBy}> Sort By <KeyboardArrowDownIcon />  </Box>
          </Box>

         <Box  className={classes.filtersDataRow}>

          {nfts.map(function(name, index){
            return <CardElement data={name} ik={index} />;
          })}

          </Box>
         </Box>
       </Box>
      </Box>
    </Layout>

  );
};

export default About;