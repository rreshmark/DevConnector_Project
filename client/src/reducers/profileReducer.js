import {
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //when the profile is loading//we are setting the loading to true so there will be a spinner indicating the user a loading process//this dispatch call happens before the axios call to the api//wh the axios calls complete upon catch we are setting loading to false again so the spinner goes away
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    //this dispatch call is made then we have got profile data from db already
    case GET_PROFILE:
      return {
        //to stop the spinner setting it false
        loading: false,
        //payload contains the profile info of the user
        profile: action.payload,
      };
    case GET_PROFILES:
      return {
        loading: false,
        profiles: action.payload,
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
}
