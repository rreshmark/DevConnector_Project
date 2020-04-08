//this reducer will write the error data in to the redux store
import {GET_ERRORS} from '../actions/types';

const initialstate={};

export default function(state=initialstate,action){
//refer video 4/5 16:50
  switch(action.type){
     case GET_ERRORS:
     return action.payload;
     default:
     return state;
    }

}