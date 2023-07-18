import React, {useEffect}  from "react";
import About from "./About";
import Footer from "./Footer";
import Motto from "./Motto";
import Navbar from "./Navbar";
import Pricing from "./Pricing";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const [cookies] = useCookies('');
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.userId){
      navigate("/account")
    }
  })

  return (
    <div>
      <Navbar />
      <Motto />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
