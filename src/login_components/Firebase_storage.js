import React, { useEffect, useState } from "react";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { onValue, ref as databaseRef, child } from "firebase/database";
import { database } from "../firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Firebase_storage() {
  // State to store uploaded file
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["downloadUrl"]);
  const [adsData, setAdsData] = useState();
  var allData = [];
  // progress
  const [percent, setPercent] = useState(0);

  const user = cookies.userId;
  const dbRef = databaseRef(database, cookies.userId);

  const showErrorToastMessage = () => {
    toast.error("Please upload a file !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showSuccessToastMessage = () => {
    toast.info("Uploading file !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      //const data = snapshot.val();
      snapshot.forEach(function (childSnapshot) {
        const childData = childSnapshot.val();
        //setAdsData(childData);
        allData.push(childData);
        setAdsData(allData.reverse());
      });
    });
  }, []);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      showErrorToastMessage();
    } else {
      showSuccessToastMessage();
      const storageRef = ref(storage, `/files/${file.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setCookie("download", url, { path: "/" });
            navigate("/information");
          });
        }
      );
    }
  };

  return (
    <div className="firebaseStorage">
      <h3 className="Price">Upload Your Advert</h3>
      <input type="file" onChange={handleChange} accept="media_type" />
      <button onClick={handleUpload}>Upload File</button>
      <p>{percent} "% done"</p>

      <h3 className="Price">My Adverts</h3>

      {adsData ? (
        adsData.map((data, index) => (
          <div key={index}>
            <p>Advert name: {data.advertName}</p>
            <p>Display days:{data.displayTime}</p>
            <p>startDate: {data.startDate}</p>
            <p>EndDate: {data.endDate}</p>
            <div>
              {new Date(data.startDate < new Date()) ? (
                <p>Status: Currently displaying</p>
              ) : (
                <p>Status: Not started/ended</p>
              )}{" "}
            </div>
            <hr />
            <p>eph</p>
            <hr />
          </div>
        ))
      ) : (
        <p></p>
      )}
      <ToastContainer />
    </div>
  );
}

export default Firebase_storage;

