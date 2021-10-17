import Layout from "components/layout/Layout";
import * as React from 'react';
import { Container,Paper, withStyles, Grid,Link, Button,Box,InputLabel, FormControl,FormLabel, MenuItem, NativeSelect ,TextareaAutosize,TextField , FormControlLabel, Checkbox, Typography  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { collapseClasses } from "@mui/material";

import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

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

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
 
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

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