var axios = require('axios');
var apiLink = '';

async function userLogin(email, password) {
   const headers = {
        "Content-Type" : `multipart/form-data`
        "Accept" : `multipart/form-data`
    };

    let data = new FormData();
    data.append( 'username', username );
    data.append( 'password', password );

    let result = await axios( {
        method:'post',
        url: 'login-verify',
        baseURL: API_URL,
        data: data,
        headers: headers,
    } );

    let response = result.data;

    if( response['success'] ){
        console.log("Login Successful");
        login_token = response['token'];
    } else {
        console.log("Failed to Login");
    } 
}

function mul(a, b) {
  return a * b
}


export { sum, mul }
