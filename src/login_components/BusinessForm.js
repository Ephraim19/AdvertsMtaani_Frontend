import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-date-picker";
import { useCookies } from "react-cookie";
import { database } from "../firebase-config";
import { set, ref, push } from "firebase/database";
import { usePaystackPayment } from "react-paystack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Places } from "./Places";

const BusinessForm = () => {
  const [busName, setBusName] = useState("");
  const [industry, setIndustry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paybill, setPaybill] = useState("");
  const [cookies] = useCookies("");
  const [checkedState, setCheckedState] = useState(
    new Array(Places.length).fill(false)
  );

  const [advertName, setAdvertName] = useState("");
  const [town, setTown] = useState();
  const user = cookies.userId;

  const showErrorToastMessage = () => {
    toast.error("Please fill all values !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showSuccessToastMessage = () => {
    toast.success("Successfully submitted !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const dateStrip = (numOfHours, date) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
    const stringDate = JSON.stringify(dateCopy.toUTCString().toString()).slice(
      1,
      -5
    );
    return stringDate;
  };

  const getNumberOfDays = (date1, date2) => {
    const difference = date1.getTime() - date2.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const getTownNames = (t) => {
    if (t) {
      const viewTowns = [];
      town.forEach((element, index) => {
        if (element === true) {
          viewTowns.push(Places[index].name);
          return viewTowns.length;
        }
      });
    }
    return false

  };

  useEffect(() => {
    console.log(Places.length)
    console.log(getTownNames(town));
  }, [town]);

  //Checkbox
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const AllPlaces = updatedCheckedState.reduce(
      (all, currentState, index, AllTowns = []) => {
        if (currentState === true) {
          return AllTowns;
        }
        return all;
      },
      Places
    );
    setTown(AllPlaces);
  };

  //Submitting to firebase
  const handleSubmit = (event) => {
    event.preventDefault();
    if (town) {
      const viewTowns = [];
      town.forEach((element, index) => {
        if (element === true) {
          viewTowns.push(Places[index].name);
        }
      });

      if (
        busName &&
        industry &&
        paybill &&
        cookies.download &&
        startDate &&
        endDate &&
        advertName
      ) {
        //push data to firebase
        set(
          push(ref(database, user), {
            busName,
            industry,
            displayTime: getNumberOfDays(endDate, startDate),
            advertName,
            paybill,
            downloadUrl: cookies.download,
            startDate,
            endDate,
            startDate: dateStrip(3, startDate),
            endDate: dateStrip(3, endDate),
            viewTowns,
          }).then(() => {
            showSuccessToastMessage();
          })
        ).catch((error) => {
          console.log(error);
        });
      } else {
        showErrorToastMessage();
      }
    } else {
      showErrorToastMessage();
    }
  };

  return (
    <div>
      <Navbar />
      <h3 className="Price">Business information</h3>
      <form className="BusinessForm">
        <label>
          Business Name:
          <br />
          <input
            type="text"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Industry:
          <br />
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </label>
        <br />
        <label>
          Advert name:
          <br />
          <input
            type="text"
            value={advertName}
            onChange={(e) => setAdvertName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Advert start date:
          <br />
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </label>
        <br />
        <label>
          Advert end date:
          <br />
          <DatePicker onChange={setEndDate} value={endDate} />
        </label>
        <br />
        <br />
        <h3>Select Places advert will be displayed.</h3>
        <ul className="toppings-list">
          <div className="toppings-list-item">
            <p className="left-section">Town</p>
            <p className="right-section">Screens</p>
          </div>
        </ul>
        <ul className="toppings-list">
          {Places.map(({ name, screens }, index) => {
            return (
              <li key={index}>
                <div className="toppings-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                  <div className="right-section">{screens}</div>
                </div>
              </li>
            );
          })}
        </ul>
        <br />
        <label>
          Your advert will run for {getNumberOfDays(endDate, startDate)} days.
          Pay <strong>ksh {getNumberOfDays(endDate, startDate) * 250} </strong>{" "}
          to paybill 522522 and account number 1262189047 and enter the payment
          code below:
          <br />
          <br />
          <input
            type="text"
            value={paybill}
            onChange={(e) => setPaybill(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BusinessForm;
