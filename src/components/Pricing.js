import React from "react";

const Pricing = () => {
  return (
    <div>
      <div className="Price">
        <h3>Pricing</h3>
      </div>
      <div className="Price-nav">
        <div className="Price-card">
          <div className="Price-info">
            <h4> Solo plan.</h4>
            <p>Ksh 150 for 15 mins.</p>
            <p>Upto 700 impressions.</p>
            <p>This plan is suitable for individual people offering various services.</p>
          </div>
        </div>

        <div className="Price-card">
          <div className="Price-info">
            <h4>Ndovu plan.</h4>
            <p>Ksh 2500 per month.</p>
            <p>Upto 100 000 impressions.</p>
            <p>This plan is suitable for small and medium enterprises looking to promote their businesses.</p>
          </div>
        </div>

        <div className="Price-card">
          <div className="Price-info">
            <h4>Simba plan </h4>
            <p>Ksh 8000 per month.</p>
            <p>Upto 500 000 impressions.</p>
            <p>Its suitable for major brands looking to promote their products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
