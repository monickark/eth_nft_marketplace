var axios = require('axios');
var apiLink = '';
import { myConfig } from '../config/config'

async function getAllCharacters() {
  let authToken = localStorage.getItem('userAuthToken');
  let headers = {};
  if (authToken) {
    headers = {
      "Content-Type": `multipart/form-data`,
      "Authorization": "Bearer " + authToken
    };
  } else {
    headers = {
      "Content-Type": `multipart/form-data`,
    };
  }
  try {
    const response = await axios({
      method: 'get',
      url: 'products',
      baseURL: myConfig.apiBaseUrl,
      headers: headers,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log('failed to fetch Profiles')
    return false;
  }
}


async function getCharacter(cid) {
  console.log("api calles", cid)
  let authToken = localStorage.getItem('userAuthToken');
  let headers = {};
  if (authToken) {
    headers = {
      "Content-Type": `multipart/form-data`,
      "Authorization": "Bearer " + authToken
    };
  } else {
    headers = {
      "Content-Type": `multipart/form-data`,
    };
  }
  try {
    const response = await axios({
      method: 'get',
      url: 'products/' + cid,
      baseURL: myConfig.apiBaseUrl,
      headers: headers,
    });
    const data = response.data; //console.log("OHODAT",data)
    return data;
  } catch (error) {
    console.log('failed to fetch Profiles')
    //throw Error(error)
    return false;
  }
}


async function saveFavourite(cid) {
  let authToken = localStorage.getItem('userAuthToken');
  let headers = {};
  if (authToken) {
    headers = {
      "Content-Type": `multipart/form-data`,
      "Authorization": "Bearer " + authToken
    };
  } else {
    headers = {
      "Content-Type": `multipart/form-data`,
    };
  }
  try {
    const response = await axios({
      method: 'post',
      url: 'products/' + cid + '/favorite',
      baseURL: myConfig.apiBaseUrl,
      headers: headers,
    });
    const data = response.data; //console.log("OHODAT",data)
    return data;
  } catch (error) {
    console.log('failed to fetch Profiles')
    //throw Error(error)
    return false;
  }
}

async function saveViews(pid) {
  let authToken = localStorage.getItem('userAuthToken');
  let headers = {};
  if (authToken) {
    headers = {
      "Content-Type": `multipart/form-data`,
      "Authorization": "Bearer " + authToken
    };
  } else {
    headers = {
      "Content-Type": `multipart/form-data`,
    };
  }
  try {
    const response = await axios({
      method: 'post',
      url: 'products/' + pid + '/view',
      baseURL: myConfig.apiBaseUrl,
      headers: headers,
    });
    const data = response.data; //console.log("OHODAT",data)
    return data;
  } catch (error) {
    console.log('failed to fetch Profiles')
    //throw Error(error)
    return false;
  }
}


//AUTH APIS

async function userLogin(formData) {
  let authToken = localStorage.getItem('userAuthToken');
  let headers = {};

  headers = {
    "Content-Type": `multipart/form-data`,
  };


  try {
    const response = await axios({
      method: 'post',
      url: 'login',
      baseURL: myConfig.apiBaseUrl,
      data: formData,
      headers: headers,
    });
    const data = response.data; //console.log("OHODAT",data)
    return data;
  } catch (error) {
    console.log('failed to login')
    //throw Error(error)
    return false;
  }
}

async function userRegister(formData) {
  let authToken = localStorage.getItem('userAuthToken');
  let headers = {};

  headers = {
    "Content-Type": `multipart/form-data`,
  };
  try {
    const response = await axios({
      method: 'post',
      url: 'signup',
      baseURL: myConfig.apiBaseUrl,
      data: formData,
      headers: headers,
    });
    const data = response.data; //console.log("OHODAT",data)
    return data;
  } catch (error) {
    console.log('failed to fetch Profiles')
    //throw Error(error)
    return error;
  }
}


//AUTH APIS ENDS

async function createCharacter(formData) {
  let authToken = localStorage.getItem('userAuthToken');
  let headers = {};
  if (authToken) {
    headers = {
      "Content-Type": `multipart/form-data`,
      "Authorization": "Bearer " + authToken
    };
  } else {
    headers = {
      "Content-Type": `multipart/form-data`,
    };
  }
  try {
    const response = await axios({
      method: 'post',
      url: 'products',
      baseURL: myConfig.apiBaseUrl,
      data: formData,
      headers: headers,
    });
    const data = response.data; //console.log("OHODAT",data)
    return data;
  } catch (error) {
    console.log('failed to fetch Profiles')
    //throw Error(error)
    return error;
  }
}



export { getAllCharacters, getCharacter, saveFavourite, saveViews, userLogin, userRegister, createCharacter }
