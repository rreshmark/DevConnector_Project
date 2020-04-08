//this reducer is going to handle auth related data to write it in store
//what data do i want my reducer to wite in to the store
import {SET_CURRENT_USER} from '../actions/types';
//when the application starts..the app.js starts all the reducer function
const initialState={
  //the initialstate is going to write the below mentioned info in store
  isAuthenticated:false,
  //checking if the user is logged in or not..by default setting it as the user is logged out
  user:{}
  //if the user is authenticated..who is the user? ..getting the user info by decrypting the token after logged in and getting the details and sharing it to all components to view
};
//this is the function that will get called when the reducers are up and running
//we are adding two pieces of info..refer for the below line video 3/29 50:00
//working is like : when application starts. App.js calls the strore mentioned beside the provider area in App.js and in store.js we have mentioned our auth reducer name inside the createstore func.so it comes here and wakes this reducer up and tell that u r gona write to the store and it takes the initialstate data and default action as mentioned below and writes too the store(whnevere reducer return anything..it writes that to the store) 
export default function(state = initialState,action){
  //refer video 4/4 24:00 for setting this line state = initialState
  switch(action.type){
    //receiving end of set-current-user [ dispatch even called as (action) ] call
case SET_CURRENT_USER:
  return {
        //spreading the state and making a copy of the state and overriding the user part  from the dispatch call with payload info  that user has entered
         ...state,
         user:action.payload
     }
    default:
      return state;
  }
}
