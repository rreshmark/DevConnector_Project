//job of thi file is to write the token given to it to the auth header and if no token given,it has to remove from auth header

import axios from 'axios';

//somebody is going to give token. we are checking if there is token or not
const setAuthToken = token => {
   if(token){
     //apply token to every request
     //refer for the below line video 4/5 56:30
     //under the common dictionary we are using Authorization key
     //as we are writing this code lines in our axios obj..during every callof axios obj the token is going to be set in the header
     axios.defaults.headers.common['Authorization'] = token;
   }
   else{
     //Delete token from auth header
     delete axios.defaults.headers.common['Authorization']
   }
};

export default setAuthToken;