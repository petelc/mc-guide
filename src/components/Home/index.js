import React from "react";

import Header from "../Header";
// import Messages from "../Messages";
import Services from "../Services";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <section className="housing" id="section-housing">
          <div className="house">
            <div className="house__heading">
              <h2 className="heading-2">Available Resources</h2>
            </div>
            <Services />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
