import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../Navigation";
import * as ROUTES from "../../constants/routes";

const Landing = () => {
  return (
    <header className="header">
      <Navigation />
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Muskingum County</span>
          <span className="heading-primary--sub">Resource Guide</span>
        </h1>
      </div>
      <div className="header__btn-box">
        <Link to={ROUTES.HOME} className="btn btn--yellow btn--animated">
          Help is out there!
        </Link>
      </div>
    </header>
  );
};

export default Landing;
