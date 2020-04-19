//refer (3/21) 54:00 for brief explanation 
import React, { Component } from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../actions/authActions';
import {Link} from 'react-router-dom';
//the reason we are using this link because href reloads the whole page rather loading only only the required componrnt..which rings performannt issues.

 class Navbar extends Component {
 onLogoutClick(e){
   e.preventDefault();
   this.props.logoutUser();
 }

  render() {
    const {isAuthenticated,user} = this.props.auth;

    //when the use is not logged in
    const guestLinks=(<ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/register">
        Sign Up
              </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/login">
        Login
              </Link>
    </li>
  </ul>);
  //when the user is logged in 
  const authLinks= (<ul className="navbar-nav ml-auto">
  <li className="nav-item">
    <Link className="nav-link" to="/feed">
      Post Feed
    </Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/dashboard">
      Dashboard
    </Link>
  </li>
  <li className="nav-item">
    <a href="" onClick={this.onLogoutClick.bind(this)}
    className="nav-link">
      <img
        className="rounded-circle"
        src={user.avatar}
        alt={user.name}
        style={{width: '25px', marginRight: '5px'}}
        title="You must have a gravatar connected to your email to display an image"
        />
      Logout
    </a>
  </li>
</ul>);
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">DevConnector</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles"> Developers
            </Link>
          </li>
        </ul>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  </nav>
    )
  }
  //we are binding in such a way that if isAuthenticated is present it will the html content of authlinks else html content of guestlinks//real time when user clicks the logout button//the binding is responsible to show the relevant data in the navbar
}
Navbar.propTypes={
  logoutUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect (mapStateToProps,{logoutUser})(Navbar);
