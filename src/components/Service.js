import React, { useState } from "react";
import { Details } from "./Details";

const Service = (props) => {
  const { assist } = props.assist;
  const [details, setDetails] = useState({ details: null });

  const handleClick = (service) => {
    // const [server] = service;
    const shit = service;
    //console.log(shit);
    setDetails(shit);
  };

  if (!assist || assist.length === 0) return <p>No Services, Sorry!</p>;
  return (
    <>
      <section className="housing" id="section-housing">
        <div className="house">
          <div className="house__heading">
            <h2 className="heading-2">Available Resources</h2>
          </div>

          <div className="house__cards">
            {assist.map((service) => {
              return (
                <div className="house__card" key={service.id}>
                  <img
                    src="../../img/housing.png"
                    className="house__card__img"
                    alt="Find Housing"
                  />
                  <h5 className="house__card__title">{service.name}</h5>
                  <div className="house__card__text">
                    {service.serviceDescription}
                  </div>
                  <a
                    className="btn--yellow house__card__btn"
                    href="#popup"
                    onClick={() => {
                      handleClick(service["resources"]);
                    }}
                  >
                    Learn More
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="popup" id="popup">
        <Details details={{ ...details }} key={details.id} />
      </div>
    </>
  );
};

export default Service;
