import React, { useState } from "react";
import { Header } from "./Header";
import { Details } from "./Details";
import { housing_data } from "../Data/data";

export const Housing = () => {
  const housing_assistance = housing_data;

  const [assist, setAssist] = useState("");

  function handleClick(hse) {
    setAssist(hse);
  }

  return (
    <>
      <Header />
      <div className="container">
        <section className="housing" id="section-housing">
          <div className="house">
            <div className="house__heading">
              <h2 className="heading-2">Housing Resources</h2>
            </div>

            <div className="house__cards">
              {housing_assistance.map((item) => (
                <div className="house__card">
                  <img
                    src="../../img/housing.png"
                    className="house__card__img"
                    alt="Find Housing"
                  />
                  <h5 className="house__card__title">{item.title}</h5>
                  <div className="house__card__text">
                    {item["short description"]}
                  </div>
                  <a
                    className="btn--yellow house__card__btn"
                    href="#popup"
                    onClick={(e) => handleClick(item)}
                  >
                    Learn More
                  </a>
                </div>
              ))}
              {/* <div className="house__card">
                <img
                  src="../../img/housing.png"
                  className="house__card__img"
                  alt="Find Housing"
                />
                <h5 className="house__card__title">
                  {housing_assistance[0].title}
                </h5>
                <div className="house__card__text">
                  {housing_data[0]["short description"]}
                </div>
                <a
                  className="btn--yellow house__card__btn"
                  href="#popup"
                  onClick={(e) => handleClick(housing_assistance[0])}
                >
                  Learn More
                </a>
              </div>

              <div className="house__card">
                <img
                  src="../../img/rent.jpg"
                  className="house__card__img"
                  alt="Rent Help"
                />
                <h5 className="house__card__title">
                  {housing_assistance[1].title}
                </h5>
                <div className="house__card__text">
                  {housing_assistance[1]["short description"]}
                </div>
                <a
                  className="btn--yellow house__card__btn"
                  href="#popup"
                  onClick={(e) => handleClick(housing_assistance[1])}
                >
                  Learn More
                </a>
              </div> */}
            </div>
          </div>
        </section>
      </div>
      <div className="popup" id="popup">
        <Details housing={assist} />
      </div>
    </>
  );
};
