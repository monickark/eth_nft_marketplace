import Layout from "components/layout/Layout";
import * as React from 'react';
import { Container, Paper, withStyles, Grid, Link, Button, Box, InputLabel, FormControl, FormLabel, MenuItem, NativeSelect, TextareaAutosize, TextField, FormControlLabel, Checkbox, Typography, FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { collapseClasses } from "@mui/material";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import NProgress from 'nprogress'; 

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import NFT from '../build/contracts/NFT.json';
import NFTMarket from '../build/contracts/NFTMarket.json';

const About = () => {  
  const [fileUrl, setFileUrl] = useState(null)
  const [btnTxt, setBtnTxt] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const classes = useStyles();
  const router = useRouter();
  const [showForm, setShowForm] = React.useState(false);

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [sendBtnText, setSendBtnText] = React.useState('CREATE MY CHARACTER');

  const [charImageErr, setCharImageErr] = React.useState('');
  const [charImage, setCharImage] = React.useState('');
  const [cnameErr, setCnameErr] = React.useState('');
  const [abilitiesErr, setAbilitiesErr] = React.useState('');
  const [storyErr, setStoryErr] = React.useState('');
  const [typeofErr, setTypeofErr] = React.useState('');
  const [levelErr, setLevelErr] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState('');

  React.useEffect(() => {
    if (!router.isReady) return;
    let authToken = localStorage.getItem('userAuthToken');
    if (!authToken) {
       localStorage.setItem('redirecto', '/create');
      router.push('/login', undefined, { shallow: true });
    } else {
    setShowForm(true);
    setBtnTxt("CREATE MY CHARACTER");
    }
  }, [router.isReady]);

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
      console.log("url: " + url);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
 
  async function createMarket() {

    console.log("inside create market");
    
  //  handleCreateCharacter();
    const { name, ability, story, price, type, level } = formInput;
    console.log("name: " + name + " ability: " + ability + " story: "+ story + " price:" + type + " type:" + price + " level:" + level + " fileUrl :" + fileUrl );
    if (!name || !ability || !story || !price || !type || !level || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, ability, story, level, price, type, ability, image: fileUrl
    })
    console.log("data: " + data);
    console.log("");
    try {
      console.log("inside file upload");
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log("url: " + url);
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    console.log("Create sale : ");
    setBtnTxt("PROCESSING...");
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = await new ethers.providers.Web3Provider(connection)    
    const signer = await provider.getSigner()
    const network = await provider.getNetwork()
    console.log("network : "+ network.chainId);
    console.log("Signer : "+ signer);
    console.log("Address : "+   NFT.networks[network.chainId].address);
    console.log("ABI : "+ NFT.abi);    
    /* next, create the item */
    let contract = new ethers.Contract(  NFT.networks[network.chainId].address, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    console.log("Price : " + price);    
    console.log("Signer : "+ signer);
    console.log("Address : "+ NFTMarket.networks[network.chainId].address);
    console.log("ABI : "+ NFTMarket.abi);

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(NFTMarket.networks[network.chainId].address, NFTMarket.abi, signer)
    let listingPrice = await contract.getListingPrice();

    listingPrice = listingPrice.toString()    
    console.log("PRICE : " + price);
    console.log("tokenId : " + tokenId);
    console.log("listingPrice : " + listingPrice);
    transaction = await contract.createMarketItem(NFT.networks[network.chainId].address,
       tokenId, price, { value: listingPrice })
    await transaction.wait()

    router.push('/characters')
  }

  // const handleCreateCharacter = async () => {
  //   console.log("hi......")
  //   let authToken = localStorage.getItem('userAuthToken');
  //   if (authToken) {
  //     console.log("inside auth......")
  //     var isFormError = false;

  //     if (charImage == "") {
  //       isFormError = true;
  //       setCharImageErr('Invalid character image')
  //     }
  //     if (values.cname == "") {
  //       isFormError = true;
  //       setCnameErr('Invalid character name')
  //     }
  //     if (values.story == "") {
  //       isFormError = true;
  //       setStoryErr('Invalid story')
  //     }
  //     if (values.abilities == "") {
  //       isFormError = true;
  //       setAbilitiesErr('Invalid abilities')
  //     }
  //     if (values.typeof == "") {
  //       isFormError = true;
  //       setTypeofErr('Invalid type of')
  //     }
  //     if (values.level == "") {
  //       isFormError = true;
  //       setLevelErr('Invalid level')
  //     }

  //     if (isFormError) {
  //       setSendBtnText('CREATE MY CHARACTER');
  //       setIsProcessing(false);
  //       return false;
  //     }
  //     else {
  //       let data = new FormData();
  //       data.append('product_image', charImage);
  //       data.append('name', values.cname);
  //       data.append('description', values.story);
  //       data.append('special_powers', values.abilities);
  //       data.append('name_of_class', values.typeof);
  //       data.append('level_value', values.level);
  //       var response = await createCharacter(data);
  //       if (response.success) {
  //         setIsSuccess('Character saved successfully.');
  //         setValues({ cname: '', abilities: '', story: '', typeof: '', level: '', ftype: '', alltype: '' });
  //       } else {
  //         if (response.response && response.response.data) {
  //           var geterrors = response.response.data.errors;
  //           if (geterrors.product_image) {
  //             setCharImageErr(geterrors.product_image)
  //           }
  //           if (geterrors.name) {
  //             setCnameErr(geterrors.name)
  //           }
  //           if (geterrors.description) {
  //             setAbilitiesErr(geterrors.description)
  //           }
  //           if (geterrors.special_powers) {
  //             setStoryErr(geterrors.special_powers)
  //           }
  //           if (geterrors.name_of_class) {
  //             setTypeofErr(geterrors.name_of_class)
  //           }
  //           if (geterrors.level_value) {
  //             setLevelErr(geterrors.level_value)
  //           }
  //           console.log(geterrors);

  //         }
  //       }

  //     }
  
  // }

  // }
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
      <input onChange={onChange} type="file" placeholder="Type Here" className={classes.formFieldText}/>
      </FormControl>
      
      <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
      <FormLabel component="legend" className={classes.formLabel}>Character Name*</FormLabel>
      <TextField  placeholder="Type Here" className={classes.formFieldText}
      onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
      </FormControl>

      <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
      <FormLabel component="legend" className={classes.formLabel}>Character Abilities*</FormLabel>
      <TextField  placeholder="Type Here" className={classes.formFieldText}
      onChange={e => updateFormInput({ ...formInput, ability: e.target.value })}/>
      </FormControl>

      <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
      <FormLabel component="legend" className={classes.formLabel}> Story*</FormLabel>
      <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Type Here"  
      className={classes.formFieldText}
      onChange={e => updateFormInput({ ...formInput, story: e.target.value })}/>
      </FormControl>

      <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
      <FormLabel component="legend" className={classes.formLabel}>Type of*</FormLabel>
      <TextField  placeholder="Type Here" className={classes.formFieldText}
      onChange={e => updateFormInput({ ...formInput, type: e.target.value })}/>
      </FormControl>

      <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
      <FormLabel component="legend" className={classes.formLabel}>Price*</FormLabel>
      <TextField  placeholder="Type Here" className={classes.formFieldText}
      onChange={e => updateFormInput({ ...formInput, price: e.target.value })}/>
      </FormControl>

      <FormControl fullWidth sx={{ m: 1 }} className={classes.formCon}>
      <FormLabel component="legend" className={classes.formLabel}>Level*</FormLabel>
         <NativeSelect inputProps={{ name: 'Level', id: 'uncontrolled-native', }}  className={classes.formFieldText}
          onChange={e => updateFormInput({ ...formInput, level: e.target.value })}>
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
      <Button onClick={createMarket} className={classes.formSubmitBtn} >{btnTxt}</Button>
      </FormControl>
      </Box>

    </Box>
    </Container>
  </Layout>

  );
};
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
    lineHeight: "1.5",
    marginBottom: "0.5rem",
    fontWeight: "500",
  },
  textWhite: {
    color: "#fff",
    marginBottom: "1rem",
    lineHeight: "1.5",
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
    color: "#fff",
    fontFamily: "Roboto",
    '& option': {
      background: "#000!important",
      padding: "10px",
      marginTop: "10px",
    },
    '& div': {
      color: "#fff",
      width: "100%",
      display: "block",
      '& input': {
        width: "100%",
        display: "block",
        padding: 0,
        margin: 0,
        fontWeight: "300",
        height: "30px",
      }
    }
  },
  formLabel: {
    color: "#fff!important",
    marginBottom: "5px",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  formCon: {
    marginTop: "1.5rem !important",
    display: "block",
    clear: "both",
  },
  formConPra: {
    marginTop: "1.5rem !important",
    display: "block",
    clear: "both",

  },
  formnotes: {
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
    color: "#fff",
    fontSize: "14px",
  },
  formConButton: {
    display: "flex",
    color: "#fff",
    alignItems: "center",
    marginBottom: "0.125rem",
    gap: "8px",
    '& span': {
      display: "inline-flex",
      padding: 0,
    },
  },
  formConBtn: {
    display: "block",
  },
  formSubmitBtn: {
    background: "#e01212",
    border: "none",
    color: "#fff",
    padding: "15px 45px",
    borderRadius: "30px",
    marginTop: "40px",
    '&:hover': {
      background: "#e01212",
    },
    '&:disabled':{
        color: "#dedede",
    }
  },


}));
export default About;