import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useList } from "react-firebase-hooks/database";

import * as ROUTES from "../../constants/routes";
// import { ServicesDataProcessor } from "../Processor";
import { firebase, db } from "../../firebase";

const Services = () => {
  const [currentService, setCurrentService] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  //   ? use react-firebase-hooks
  const [services, loading, error] = useList(db.getAllServices());

  const refreshList = () => {
    setCurrentService(null);
    setCurrentIndex(-1);
  };

  //   * set active service will handle the opening of the resource I think
  const setActiveService = (service, index) => {
    const { name, shortDescription, img_path } = service.val();

    setCurrentService({
      key: service.key,
      name: service.name,
      shortDescription: service.shortDescription,
      img_path: service.img_path,
    });

    setCurrentIndex(index);
  };

  return (
    <>
      <div className="house__cards">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        {!loading &&
          services &&
          services.map((service, index) => (
            <div className="house__card" key={index}>
              <img
                src={service.val().img_path}
                alt={service.val().name}
                className="house__card__img"
              />
              <h5 className="house__card__title">{service.val().name}</h5>
              <div className="house__card__text">
                {service.val().shortDescription}
              </div>
              <Link
                to={`${ROUTES.RESOURCES}/?q=${service.val().name}`}
                className="btn--submit house__card__btn"
              >
                Learn More
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Services;
