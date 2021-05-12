import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
// import ServiceItem from "./ServicesItem";

const ServicesList = ({ services }) => (
  <>
    {Object.keys(services).map((key) => (
      <div className="house__card">
        {/* <ServiceItem key={key} service={services} /> */}
        <img
          src={services[key].img_path}
          className="house__card__img"
          alt="Find Housing"
        />
        <h5 className="house__card__title">{services[key].name}</h5>
        <div className="house__card__text">
          {services[key].shortDescription}
        </div>
        <Link
          to={`${ROUTES.RESOURCES}/?q=${services[key].name}`}
          className="btn--submit house__card__btn"
        >
          Learn More
        </Link>
      </div>
    ))}
  </>
);

export default ServicesList;
