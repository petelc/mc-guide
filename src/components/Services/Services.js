import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import ServicesList from "./ServicesList";

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      open: false,
      services: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.services().on("value", (snapshot) => {
      const servicesObject = snapshot.val();

      if (servicesObject) {
        const servicesList = Object.keys(servicesObject).map((key) => ({
          ...servicesObject[key],
          sid: key,
        }));

        this.setState({ services: servicesList, loading: false });
      } else {
        this.setState({ services: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.services().off();
  }

  render() {
    const { services, loading } = this.state;

    return (
      <>
        <div className="house__cards">
          {loading && <div>Loading....</div>}
          {services ? (
            <ServicesList key={services.sid} services={services} />
          ) : (
            <div>There are no available services .....</div>
          )}
        </div>
      </>
    );
  }
}

export default withFirebase(Services);
