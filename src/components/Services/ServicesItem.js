import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

import { withFirebase } from "../Firebase";

class ServiceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
    };
  }

  render() {
    const { service } = this.props;

    return (
      <>
        <img
          src={service.img_path}
          className="house__card__img"
          alt="Find Housing"
        />
        <h5 className="house__card__title">{service.name}</h5>
        <div className="house__card__text">{service.shortDescription}</div>
        <Link
          to={`${ROUTES.RESOURCES}/?q=${service.name}`}
          className="btn--submit house__card__btn"
        >
          Learn More
        </Link>
      </>
    );
  }
}
export default withFirebase(ServiceItem);

// /img/housing.png
