//in this file we are going to specify all the reducers that are going to write in store in to a one common reducer and use the commonreducer at the store 

import {combineReducers} from 'redux';
//combineReducer => it's job is to make a array out of all the reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';

//combineReducer is a function..u r going to make a obj out of it
export default combineReducers({
  auth : authReducer,
  //giving a friendly name as auth
  errors: errorReducer
});