import React from "react";
import './layouts.css';
import logo from '../assets/logo.svg';
import userIco from '../assets/user.png';

function HeaderLayout() {
  return <React.Fragment>
    <div className="header-content">
      <img src={logo} className="logo-display"></img>
      <img src={userIco} className="user-profile-header"></img>
    </div>
    
  </React.Fragment>;
}

export default HeaderLayout;
