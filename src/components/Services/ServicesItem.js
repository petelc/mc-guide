import React from "react";

const ServiceItem = ({ service }) => (
  <>
    <img
      src={service.img_path}
      className="house__card__img"
      alt="Find Housing"
    />
    <h5 className="house__card__title">{service.name}</h5>
    <div className="house__card__text">{service.shortDescription}</div>
  </>
);
export default ServiceItem;

// /img/housing.png
