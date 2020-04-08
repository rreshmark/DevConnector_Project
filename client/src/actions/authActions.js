//this file is going to fire all the dispatch calls
import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';

//register user action
//new way of writing functions ..old way is written in reducer file
//when the submit butoon is pressed.the below action is triggered and we are storing the field data entered in userData

//before inserting axios call in to this file
// export const registerUser = (userData) => {
//   //this is a firing end of dispatch call..now this is in air to get picked up by the authReducer and spread the state and write the userData in to the redux store
//  return {
//    type:SET_CURRENT_USER,
//    payload:userData
//  }
// }
//after inserting axios call
//upon the click of submit button,this registeruser action is kicked off and it is making an axios call where if any errros is returned it is going to trigger a dispatch call to get_errors and error reducer  is going to write the payload(errors) in store 
//upon success where i need to go is handled by history prop bag refer video 4/5 41:50
export const registerUser = (userData,history) =>
dispatch => {
  axios
       .post("/api/users/register", userData)
      .then(res =>history.push('/login'))
      //another way to route .then(res => window.location.href ='/login') this methos is not ideal as it will reload the whole page again
      //we are using the get_reducer to write the errors in the store
      //upon errors we are going to dispatch(we need to mention wat type of action and wat payload are we dispatching)
      .catch(err => 
        dispatch({
          type:GET_ERRORS,
          payload:err.response.data
        }));
}

//Login - get user token
// in the ogin page while clicking the login button this loginuser action is triggered same as registeruser as described above
export const loginUser = (userData) =>
dispatch => {
  axios
  .post('/api/users/login',userData)
  .then(res =>{
    //save to localstorage
    // set token to axios auth header
  }
    )
  .catch(err =>
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    }))
}