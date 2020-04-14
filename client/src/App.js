//this is the file that gets kicked off on starting
//reason for changing this file from RFC to RCC 4/11 36:00

import React,{ Component } from 'react';
import {Provider} from 'react-redux';
//provider is the lib with wich we can use the store..
import {BrowserRouter as Router, Route} from 'react-router-dom';
//route is used to tell wat are the possible routes available thT WE CAN WORK WITH
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';
import jwt_decode from 'jwt-decode';
import { logoutUser } from './actions/authActions';

//if user after login closes the tab and reopens//we have to navigate him to the dashboard page//decode the token and set in auth header and send dispatch call to store
//we need not use "connect" as we did in register and login//App.js already has access to store// 4/11 44:00
if(localStorage.jwtToken){
  //decode
  //in the decoded token we have issued at and expiry time of the token
const decoded =jwt_decode(localStorage.jwtToken);

  //check for expired token
  //Date.now() will give millisec//so dividing to get sec//bcoz exp time is in seconds
const currentTime = Date.now() / 1000 ;
if(decoded.exp < currentTime){
  //Logout User
  store.dispatch(logoutUser());
  //Redirect login
  window.location.href='/login';
}

  //set auth header
  setAuthToken(localStorage.jwtToken);
//dispatch call
store.dispatch({
  type:SET_CURRENT_USER,
  payload:decoded
});

}

class App extends Component {
  //As per 4/11 we are changing App.js to RCC for checking the token expiration and routing of the dashboard page.//SO we are using render function and putting the div inside that
  
  render(){
  return (
    //Browser router is mentioned as router below.
    //we are saying that all the 3 components are routable.
    //refer 3/22 8:00 for exact path
    //hee path refers same as router.get in express routing
    //wrapping all the components around provider..so that they can use the store
      <Provider store={store}>
      <Router> 
      <div className="App">
        <Navbar />
        
        <Route exact path ="/" component ={Landing} />
        <Route exact path ="/register" component ={Register} />
        <Route exact path ="/login" component={Login} />
        <Footer />
      </div>
      </Router>
      </Provider>
    );
}
}

export default App;
