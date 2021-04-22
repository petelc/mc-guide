import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="navigation">
      <div className="navigation__item">
        <Link to="/" className="navigation__link">
          Home
        </Link>
      </div>
      <div className="navigation__item">
        <Link to={"/housing"} className="navigation__link">
          Housing
        </Link>
      </div>
      <div className="navigation__item">
        <Link to="/food" className="navigation__link">
          Food Help
        </Link>
      </div>
      <div className="navigation__item">
        <Link to="/mental" className="navigation__link">
          Mental Health
        </Link>
      </div>
      <div className="navigation__item">
        <Link to="/substance" className="navigation__link">
          Substance Abuse
        </Link>
      </div>
      <div className="navigation__item">
        <Link to="/about" className="navigation__link">
          About
        </Link>
      </div>
      <div className="navigation__item">
        <Link to="/contact" className="navigation__link">
          Contact
        </Link>
      </div>
    </div>
  );
};
