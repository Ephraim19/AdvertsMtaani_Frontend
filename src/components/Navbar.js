import React, {useState} from "react";
import logo from "../images/mtaani_logo.png";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

const Navbar = () => {

  const [isAuth, setIsAuth] = useState(false);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };

  return (
    <nav className="App-nav">
      <img src={logo} alt="logo" className="App-logo" />
      <p className="App-info">Home</p>
      <p className="App-info">Blog</p>
      <p className="App-info">About</p>
      <p className="App-info">Pricing</p>
      <button className="App-info" onClick={signInWithGoogle}>Login</button>
    </nav>
  );
};

export default Navbar;
