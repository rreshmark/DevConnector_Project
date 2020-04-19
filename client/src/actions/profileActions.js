import axios from "axios"
import { GET_ERRORS } from "./types"

//on clicking the button after entering the data in the create profile page//we are passing the profiledata in profileData and history to push the page
export const createProfile = (profileData,history) 
=> dispatch => {
axios
.post('api/profile',profileData)
.then(res => history.push('/dashboard'))
.catch(err =>
  dispatch ({
    type:GET_ERRORS,
    payload:err.response.data
  })) 
}

//after entering the experience details and on clicking the submit button

 export const addExperience = (expData,history) 
 => dispatch => {
   axios
   .post('api/profile/experience',expData)
   .then(res => history.push('/dashboard'))
   .catch(
     err =>
     dispatch({
       typr:GET_ERRORS,
       payload:err.response.data
     }))
 }

 //likewise in case of adding educationdetails and hitting the submit button
 export const addEducation =(eduData,history)
 => dispatch => {
   axios
   .post('/api/profile/education',eduData)
   .then(res => history.push('/dashboard'))
   .catch(err =>
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    }))
 }