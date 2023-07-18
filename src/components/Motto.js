import React,{useState} from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Motto = () => {
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
    <section>
      <div className="App-motto">
        <h1 className="bigsize">LET THE UNIVERSE RECOGNIZE  </h1>
        <h1 className="bigsize">YOUR HUSTLE</h1>
      </div>

      <div className="explanation">
        <p>
          Complete advertising platform with smart screens located in last mile
          streets with good traffic.
        </p>
        <p>
          Upload your video or image advert and it will be displayed at selected
          locations.
        </p>
        <p>Easy fast & reliable</p>
        <button className="App-info" onClick={signInWithGoogle}>
        Start your free trial
      </button>
      <p>2 days free then Ksh 250 per day</p>
      </div>

    </section>
  );
};

export default Motto;
