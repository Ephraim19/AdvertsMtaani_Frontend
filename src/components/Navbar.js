import React from "react";
import logo from "../images/mtaani_logo.png";

const Navbar = () => {
  return (
    <nav>
      <div className="App-nav">
        <img src={logo} alt="logo" className="App-logo" />
        <p className="App-info" >Home</p>
        <p className="App-info" >Blog</p>
        <p className="App-info" >About</p>
        <p className="App-info" >Contact</p>
        <p className="App-info" >Pricing</p>
      </div>
    </nav>
  );
};

export default Navbar;
