import React from "react";

import ServiceItem from "./ServicesItem";

const ServicesList = ({ services }) => (
  <div className="house__card">
    {services.map((service) => (
      <ServiceItem key={service.sid} service={service} />
    ))}
  </div>
);

export default ServicesList;
