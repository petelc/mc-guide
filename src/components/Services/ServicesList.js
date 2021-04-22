import React from "react";

import ServiceItem from "./ServicesItem";

const ServicesList = ({ services, open, onModalChange }) => (
  <>
    {services.map((service) => (
      <div className="house__card">
        <ServiceItem service={service} />
      </div>
    ))}
  </>
);

export default ServicesList;
