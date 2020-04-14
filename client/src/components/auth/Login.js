import React, { Component } from 'react';
import classnames from 'classnames';
//import axios from 'axios';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

 class Login extends Component {
   constructor(){
     super();
     this.state={
       email:'',
       password:'',
       errors:{}
     };
       this.onChange = this.onChange.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
   }
    
   onChange(e){
     this.setState({[e.target.name] : e.target.value});
   }

   onSubmit(e){
     e.preventDefault();
     const user={
       email: this.state.email,
       password: this.state.password
     };
     //once we receive the data in the login page//we are firing the loginuser action by passing the entered data 
     this.props.loginUser(user);
   //In 4/5 session we have moved it to loginUser action 
    //  axios.post("/api/users/login", user)
    //  .then(res => console.log(res.data))
    //  .catch(err => this.setState({errors:err.response.data}));
   }
   //scroll end //when the component is loaded on the page//im checking if there is auth info in store//if present and it is true using the history to push to dashboard
   componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
       }
   //nextProps is the data that i get back from the redux store//once the nextprops is back with the data in the login page,we are checking if the isAuthenticated is true,if true then we are using the history present in props bag to push it to the dashboard page.//details 4/11 21:55 , 24:30 about another way of using history
   //componentWillReceiveProps will only fire when the component(login page) is already loaded and when there is new data in store. 4/11 48:00
   componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if(nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
  }
  render() {
    const {errors}= this.state;
    return (
      <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your DevConnector account</p>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="email" className={classnames("form-control form-control-lg", {'is-invalid':errors.email})} placeholder="Email Address" name="email" 
              value={this.state.email}
              onChange={this.onChange}
              />
              {errors.email && (
                <div className='invalid-feedback'>{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg",{'is-invalid' : errors.password})} placeholder="Password" name="password"
              value={this.state.password}
              onChange={this.onChange}
              />
              {errors.password && (
                <div className='invalid-feedback'>{errors.password}</div>
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
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = (state) =>({
  auth:state.auth,
  errors:state.errors
});



export default connect (mapStateToProps,{loginUser})(Login);

//the reason for using componentDidMount is that when we reload the page after closing there is data in store but componentWillReceiveProps is not loaded by the time it is loaded the data is written in the store//one disadvantage with  componentWillReceiveProps when it is not loaded and new data is written in the store it cannot be traced by componentWillReceiveProps.hence, to overcome this we are using componentwillMount
 