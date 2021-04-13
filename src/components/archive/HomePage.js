import React from "react";
import { Nav } from "./Nav";

export const HomePage = () => {
  return (
    <header className="header">
      <Nav />
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Muskingum County</span>
          <span className="heading-primary--sub">Resource Guide</span>
        </h1>
      </div>
      <div className="header__btn-box">
        <a href="https://traxs.dev" className="btn btn--yellow btn--animated">
          Help is out there!
        </a>
      </div>
    </header>
  );
};
