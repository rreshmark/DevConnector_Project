import React, { Component } from 'react';
import classnames from 'classnames';
//this lib is used for condition checking for styles in html
//import axios from "axios";
//after getting the page's value we need to give it to api..so to make call to api axios lib is required
//this helps to allow the component connect with redux store
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
//PropTypes is a class that is used to ensure that all functions(auth action,registeruser) you require off of the redux store is available to you before the component is loaded

//state is like temp storage which stores the values entered in the component..and keeps it till the component is alive
//constructor is the first stage in rcc life cycle and render is the last stage

 class Register extends Component {
   //there are some predefined state objects in component class ..as we are inheriting from our base class..we can make use of that using this keyword
   constructor(){
   super();
   //super is another name for parent clas i.e Component here
   this.state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
    //this errors obj will store all the errors coming from the validation in api
  };
  this.onChange = this.onChange.bind(this);
  //this is a vare but here iam pointing it to a function
  //the meaning of the line is that anywhere in the code u see this.onchange it is inherently pointing to the rhs side of the equal sign..
  this.onSubmit = this.onSubmit.bind(this);
  //when u hit the submit button in the form..the form s going to submit that dat in to the onsubmit func which in turn is going to submit it to my api
}
onChange(e) {
  //inside this e parameter the value of onchange event is stored and it gives us the value entered and which onchange is getting fired like (name,passowrd,email field) 
  this.setState({ [e.target.name]: e.target.value });
}
  //in order to changge values in state we have to call it as setState
  //[e.target.name] => property binding is done and dynamicaly  storing the name of the control
  //the data in value is stored in the respective [e.target.name] field
  //we are going to take the value and bind it with state
  //e.target.name => name of the control firing the onchange
  // e.target.value => value of the control

onSubmit(e) {
  e.preventDefault();
  //this is to prevent the button from performing it's default actions of transfering the data as parameters to the next page..
  //this newUser is going to be sent to the api
  const newUser = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    password2: this.state.password2
  };
  // axios
  // //the obj formed in the onsubmit fun needs to get sent to thr register api..so we are using post and giving the router path and the obj name i.e newUser
  //     .post("/api/users/register", newUser)
  //     .then(res => console.log(res.data))
  //     .catch(err => this.setState({errors:err.response.data}));
      //we are taking the error messages and setting it to the state
      //err.response.data will show the errors which we have mentioned it in each route as res.ststus(404).json({nopost:no post found }) <= example like these

      //props is a global property of component as we are inheriting from the base class and down we have connected the register component to talk to redux store..we have inserted that registeruser action inside the props..
      //refer video 4/4 37:00
      //newUser is going to be stored as userData payload info  in to store.
      //anything thatu put in to or get back from the redux store.. it goes in to the props bag
      //propsbag already has history object in it
      this.props.registerUser(newUser,this.props.history)
}

//this is one of the lifecycle stages that will get triggered on the component when the new data arrives from the redux store
//mapstatetoprops func will get the new data from the redux store and as soon as the new data comes in the component this lifecylce stage gets triggered.
//refer video 4/5 30:45
 componentWillReceiveProps(nextProps){
   if(nextProps.errors){
     this.setState({errors:nextProps.errors})
   }
 }
  render() {
    //const errors = this.state.erros
    const {errors} = this.state;
    //const {errors} = this.props;
    //deconstruction refer video 3/28 19:00 for details about errors handling
    //const user = this.props.auth.user
    const {user} = this.props.auth;
    return (
      
      <div className="register">
        {user ? user.name : null}
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
        
          <form onSubmit={this.onSubmit} >
            
            <div className="form-group">
              
              <input type="text" className={classnames("form-control form-control-lg", {'is-invalid': errors.name})} 
              //is-invalid is bootstrap styling will make the box red //errors.name is the thin which we did in api level
              // //classnames is a function and first parameter is the defulat class that we wanna have irrespective of success or failure and second parameter is a obj is-invalid : is if check here.. video 3/28 24:05
              
               placeholder="Name" name="name"
              
               // // in html..watever we type in the text box is value property .. {} is binding ..bind the value entered to the state.name..
              // // in the above line the state is only putting the daa in value and not accepting any from the textbox
              // //the below is read it from the state
              value={this.state.name} 
              onChange={this.onChange} 
              // //the above is send it to the state
              // //onchange is a event in html which takes the data entered in the textbox ans assign it to a function as input that gives it to the state
              // //below required has been removed

              //in line 93 for getting the error message beneath every box we are checking if errors.name exists..the reason for the check is that if it doen exist then we need not give the space for the message.. and then using invalid-feedback bootstarp tyle to display content..
              
               />
               
              {errors.name && (
                <div className='invalid-feedback'>{errors.name}</div>
              )}
              
            </div>
            <div className="form-group">
              <input type="email" className={classnames("form-control form-control-lg" ,{'is-invalid':errors.email})}placeholder="Email Address" name="email" 
              value={this.state.email}
              onChange={this.onChange}
              />
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>

              {errors.email && (
                <div className='invalid-feedback'>{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg",{'is-invalid':errors.password})} placeholder="Password" name="password" 
              value={this.state.password}
              onChange={this.onChange}
              />
              {errors.password && (
                <div className='invalid-feedback'>{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg" ,{'is-invalid':errors.password2})}placeholder="Confirm Password" name="password2"
              value={this.state.password2}
              onChange={this.onChange}
              />
              {errors.password2 && (
                <div className='invalid-feedback'>{errors.password2}</div>
              )}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
//in ordr to safeguard we are checking if the reguser fun and auth oject is present before the Register component is getting loaded
Register.propTypes ={
  registerUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
  //even the errors is empty..we are checking atleast it is present in redux store
}
//from the redux store the data is mapped from state to props bag and in the state parameter the newly entered redux data is present from that we want the auth info and stroing it a var called auth that we are creating in the props bag 
  //refer video 4/4 1:2:44
  const mapStateToProps = (state) =>({
    auth : state.auth,
    errors:state.errors
  });

//we are enabling connect feture to the register component to talk to the redux store and saying the register component that it can fire the action called registeruser
//refer  video 4/4 35:00
//anything thatu put in to or get back from the redux store.. it goes in to the props bag
export default connect(mapStateToProps,{registerUser}) (Register);
