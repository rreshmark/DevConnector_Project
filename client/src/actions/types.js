//in this file we are going to list all the dispatch calls that are going to be triggered by the action

export const SET_CURRENT_USER = "SET_CURRENT_USER";
//"SET_CURRENT_USER" is the dispatch call ..we are storing it in a var because when we call the string everywhere there are chances of geting typo error.
export const GET_ERRORS = "GET_ERRORS";
export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILES = "GET_PROFILES";
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE";