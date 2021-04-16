import React from "react";

const ServiceItem = ({ service }) => (
  <>
    <h5 className="house__card__title">{service.sid}</h5>
    <div className="house__card__text">{service.type}</div>
  </>
);
export default ServiceItem;
