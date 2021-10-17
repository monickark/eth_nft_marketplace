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

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import NFT from '../build/contracts/NFT.json';
import NFTMarket from '../build/contracts/NFTMarket.json';

const About = () => {  
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const classes = useStyles();
  const router = useRouter();
  var icount = 0;

  const [values, setValues] = React.useState({
    cname: '',
    abilities: '',
    story: '',
    typeof: '',
    level: '',
    ftype: false,
    alltype: false,
  });


  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [sendBtnText, setSendBtnText] = React.useState('CREATE MY CHARACTER');

  const [charImageErr, setCharImageErr] = React.useState('');
  const [charImage, setCharImage] = React.useState('');
  const [cnameErr, setCnameErr] = React.useState('');
  const [abilitiesErr, setAbilitiesErr] = React.useState('');
  const [storyErr, setStoryErr] = React.useState('');
  const [typeofErr, setTypeofErr] = React.useState('');
  const [levelErr, setLevelErr] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState('');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  React.useEffect(() => {
    if (!router.isReady) return;
    let authToken = localStorage.getItem('userAuthToken');
    if (!authToken) {
       localStorage.setItem('redirecto', '/create');
      router.push('/login', undefined, { shallow: true });
    } else {
    setShowForm(true);
    }
  }, [router.isReady]);

  const handleChangeImage = async(e) => {
    setCharImage(e.target.files[0]);
    const file = e.target.files[0];
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("url : " + url);
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }


  const handleCreateCharacter = async (e) => {    
    console.log("handleCreateCharacter");
    let authToken = localStorage.getItem('userAuthToken');
    console.log("authToken : " + authToken);
    if (authToken) {
      e.preventDefault();
      var isFormError = false;
      setSendBtnText('Processing');
      setIsProcessing(true);
      setCharImageErr('');
      setCnameErr('');
      setAbilitiesErr('');
      setStoryErr('');
      setTypeofErr('');
      setLevelErr('');

      if (charImage == "") {
        isFormError = true;
        setCharImageErr('Invalid character image')
      }
      if (values.cname == "") {
        isFormError = true;
        setCnameErr('Invalid character name')
      }
      if (values.story == "") {
        isFormError = true;
        setStoryErr('Invalid story')
      }
      if (values.abilities == "") {
        isFormError = true;
        setAbilitiesErr('Invalid abilities')
      }
      if (values.typeof == "") {
        isFormError = true;
        setTypeofErr('Invalid type of')
      }
      if (values.level == "") {
        isFormError = true;
        setLevelErr('Invalid level')
      }

      if (isFormError) {
        setSendBtnText('CREATE MY CHARACTER');
        setIsProcessing(false);
        return false;
      }
      else {
        console.log("correct form data....");
        //let data = new FormData();
        console.log("Valuesa : " + JSON.stringify(values));
        // data.append('product_image', charImage);
        // data.append('name', values.cname);
        // data.append('description', values.story);
        // data.append('special_powers', values.abilities);
        // data.append('name_of_class', values.typeof);
        // data.append('level_value', values.level);
        const added = await client.add(JSON.stringify(values));             
        console.log("added: " + added);  
        console.log("charImage: " + charImage);   
        var response = await createSale(charImage);
        console.log("response: " + response);
        if (response) {
          setIsSuccess('Character saved successfully.');
          setValues({ cname: '', abilities: '', story: '', typeof: '', level: '', ftype: '', alltype: '' });
        } else {
          if (response.response && response.response.data) {
            var geterrors = response.response.data.errors;
            if (geterrors.product_image) {
              setCharImageErr(geterrors.product_image)
            }
            if (geterrors.name) {
              setCnameErr(geterrors.name)
            }
            if (geterrors.description) {
              setAbilitiesErr(geterrors.description)
            }
            if (geterrors.special_powers) {
              setStoryErr(geterrors.special_powers)
            }
            if (geterrors.name_of_class) {
              setTypeofErr(geterrors.name_of_class)
            }
            if (geterrors.level_value) {
              setLevelErr(geterrors.level_value)
            }
            console.log(geterrors);

          }
        }
        setSendBtnText('CREATE MY CHARACTER');
        setIsProcessing(false);

      }
    } else {
      setSendBtnText('CREATE MY CHARACTER');
      setIsProcessing(false);
    }
  }

  async function createSale(data) {
    console.log("Create sale : " + data);
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = await new ethers.providers.Web3Provider(connection)    
    const signer = await provider.getSigner()
    const network = await provider.getNetwork()
    console.log("nft network : "+ network.chainId);
    console.log("Signer : "+ signer);
    console.log("nft Address : "+   NFT.networks[network.chainId].address);
    console.log("nnft ABI : "+ NFT.abi); 
    console.log("nft charImage : "+ charImage);    
    /* next, create the item */
    let contract = new ethers.Contract(  NFT.networks[network.chainId].address, NFT.abi, signer)
    let transaction = await contract.createToken(data);
    let tx = await transaction.wait()
    console.log("tx : " + tx);    
    let event = tx.events[0]
    let value = event.args[2]
    console.log("value : " + value);  
    let tokenId = value
    // const price = ethers.utils.parseUnits(formInput.price, 'ether')
    // console.log("Price : " + price);    
    console.log("Signer : "+ signer);
    console.log("nftmarket Address : "+ NFTMarket.networks[network.chainId].address);
    console.log("nftmarket ABI : "+ NFTMarket.abi);

    /* then list the  item for sale on the marketplace */
    contract = new ethers.Contract(NFTMarket.networks[network.chainId].address, NFTMarket.abi, signer)
    let listingPrice = await contract.getListingPrice();

    listingPrice = listingPrice.toString()    
    //console.log("PRICE : " + price);
    console.log("tokenId : " + tokenId);
    console.log("listingPrice : " + listingPrice);
    transaction = await contract.createMarketItem(NFT.networks[network.chainId].address,
       tokenId, 1, { value: listingPrice })
    await transaction.wait()
    router.push('/characters')
    return "success";
  }


  return (
    <Layout>
      <Container className={classes.customContainer} key={icount++} style={{display:(showForm)?'block':'none'}}>

        <Box className={classes.createPageWraper} key={icount++}>
          <Typography variant="h1" className={classes.createTitle}>Create New Character</Typography>
          <p className={classes.textWhite}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          <p className={classes.textWhite}>There are many variations of passages of Lorem Ipsum available </p>
          <Box className={classes.createForm}>



            <FormControl sx={{ m: 1 }} className={classes.formCon} key={icount++}>
              <FormLabel className={classes.formLabel}>Character Image</FormLabel>
              <input type="file" placeholder="Type Here" className={classes.formFieldText} onChange={handleChangeImage} />
              <FormHelperText id="component-error-text1" style={{ color: 'red' }}>{charImageErr}</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1 }} className={classes.formCon} key={icount++}>
              <FormLabel component="legend" className={classes.formLabel}>Character Name*</FormLabel>
              <TextField type="text" placeholder="Type Here"
                className={classes.formFieldText}
                value={values.cname}
                onChange={handleChange('cname')}
              />
              <FormHelperText id="component-error-text1" style={{ color: 'red' }}>{cnameErr}</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1 }} className={classes.formCon} key={icount++}>
              <FormLabel component="legend" className={classes.formLabel}>Character Abilities*</FormLabel>
              <TextField type="text" placeholder="Type Here"
                value={values.abilities}
                onChange={handleChange('abilities')} className={classes.formFieldText} />

              <FormHelperText id="component-error-text1" style={{ color: 'red' }}>{abilitiesErr}</FormHelperText>
            </FormControl>




            <FormControl sx={{ m: 1 }} className={classes.formCon} key={icount++}>
              <FormLabel component="legend" className={classes.formLabel}> Story*</FormLabel>
              <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Type Here" className={classes.formFieldText} value={values.story}
                onChange={handleChange('story')} />

              <FormHelperText id="component-error-text1" style={{ color: 'red' }}>{storyErr}</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1 }} className={classes.formCon} key={icount++}>
              <FormLabel component="legend" className={classes.formLabel}>Type Of*</FormLabel>
              <TextField type="text" placeholder="Type Here" value={values.typeof}
                onChange={handleChange('typeof')} className={classes.formFieldText} />

              <FormHelperText id="component-error-text1" style={{ color: 'red' }}>{typeofErr}</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1 }} className={classes.formCon} key={icount++}>
              <FormLabel component="legend" className={classes.formLabel}>Level*</FormLabel>
              <NativeSelect value={values.level} onChange={handleChange('level')} inputProps={{ name: 'Level', id: 'uncontrolled-native', }} className={classes.formFieldText}>
                <option value="">Select</option>
                <option value={1}>Level 1</option>
                <option value={2}>Level 2</option>
                <option value={3}>Level 3</option>
                <option value={4}>Level 4</option>
                <option value={5}>Level 5</option>
              </NativeSelect>

              <FormHelperText id="component-error-text1" style={{ color: 'red' }}>{levelErr}</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1 }} className={classes.formConPra} key={icount++}>
              <p className={classes.formnotes}> <DescriptionOutlinedIcon /> Intellectual Proparty Rights </p>
            </FormControl>

            <FormControl sx={{ m: 1 }} className={classes.formCon} key={icount++}>
              <Box className={classes.formConButton}>
                <Checkbox name="Film" className={classes.formConButton} /> Film, Movies, Video, TV Programs </Box>
              <Box className={classes.formConButton}>
                <Checkbox name="All" className={classes.formConButton} /> All</Box>

            </FormControl>
            <Box sx={{ m: 1 }} className={classes.formConBtn}>
              <Button className={classes.formSubmitBtn} disabled={(isProcessing) ? true : false} onClick={handleCreateCharacter} >{sendBtnText}</Button>
              <br /><br />
              {(isSuccess && isSuccess != "") ?
                <Alert severity="success">{isSuccess}</Alert>
                : ''}

            </Box>
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