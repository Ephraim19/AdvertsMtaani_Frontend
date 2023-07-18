import React from "react";

const About = (props) => {
  return (
    <section className="App-card">
      <div className="Card-info">
        <h3>So how does it work ?</h3>
        <div className="App-motto">
          <h3 className="About">
            You can display your adverts in 3 easy steps.{" "}
          </h3>
        </div>
        <ul>
          <li>Upload your advert to our server.</li>
          <li>Select the location the advert will be played and pay.</li>
          <li>Monitor as your advert gets impressions.</li>
        </ul>
        <h3 className="About">Adverts mtaani is right for you if. </h3>
        <ul>
          <li>You run a SME or MSME and want to reach out to people in your place.</li>
          <li>You run an online business i.e ecommerce.</li>
          <li>You offer services and would like to advertise them.</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
