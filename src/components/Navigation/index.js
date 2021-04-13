import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigation__item">
        <Link to={ROUTES.LANDING} className="navigation__link">
          Home
        </Link>
      </div>
      <div className="navigation__item">
        <Link to={ROUTES.HOME} className="navigation__link">
          Services
        </Link>
      </div>

      <div className="navigation__item">
        <Link to={ROUTES.ABOUT} className="navigation__link">
          About
        </Link>
      </div>
      <div className="navigation__item">
        <Link to={ROUTES.CONTACT} className="navigation__link">
          Contact
        </Link>
      </div>
      <div className="navigation__item">
        <Link to={ROUTES.ACCOUNT} className="navigation__link">
          Account
        </Link>
      </div>
      <div className="navigation__item">
        <Link to={ROUTES.ADMIN} className="navigation__link">
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
