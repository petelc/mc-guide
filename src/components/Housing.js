import React from "react";
import { Header } from "./Header";

export const Housing = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="housing">
          <div className="housing__heading">
            <h2 className="heading-2">Housing Assistance</h2>
          </div>

          <div className="housing__cards">
            <div className="housing__card">
              <img
                src="../../img/housing.png"
                className="housing__card__img"
                alt="Find Housing"
              />
              <h5 className="housing__card__title">Find Housing</h5>
              <div className="housing__card__text">
                Find resources to assist in finding housing.
              </div>
              <a className="btn--yellow housing__card__btn" href="#shit">
                Learn More
              </a>
            </div>

            <div className="housing__card">
              <img
                src="../../img/rent.jpg"
                className="housing__card__img"
                alt="Rent Help"
              />
              <h5 className="housing__card__title">Rent/Mortgage Help</h5>
              <div className="housing__card__text">
                Find resources to assist in paying your rent or mortgage.
              </div>
              <a className="btn--yellow housing__card__btn" href="#shit">
                Learn More
              </a>
            </div>
          </div>

          <div className="housing__side-bar">
            <img
              src="../../img/dontbeafraid.jpg"
              alt=""
              className="housing__side-bar--img"
            />
          </div>
        </div>
      </div>
    </>
  );
};
