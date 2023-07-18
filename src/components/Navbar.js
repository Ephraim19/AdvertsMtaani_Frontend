import React, { useState } from "react";
import logo from "../images/mtaani_logo.png";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [Uid, setUid] = useState("");
  const [cookies, setCookie] = useCookies(['User']);
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUid(result.user.uid);
      setCookie('userId',result.user.uid,{ path: '/'});
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/account");
    });
  };

  return (
    <nav className="App-nav">
      <img src={logo} alt="logo" className="App-logo" />
      <p className="App-info">Home</p>
      <p className="App-info">Blog</p>
      <p className="App-info">Pricing</p>
      <button className="App-info" onClick={signInWithGoogle}>
        {isAuth ? "Login" : "Start your free trial"}
      </button>
    </nav>
  );
};

export default Navbar;
