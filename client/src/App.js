import React from 'react';
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


function App() {
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

export default App;
