import React from "react";

import ServiceItem from "./ServicesItem";

const ServicesList = ({ services }) => (
  <>
    {services.map((service) => (
      <div className="house__card">
        <ServiceItem key={service.sid} service={service} />
      </div>
    ))}
  </>
);

export default ServicesList;
