import React, { Component } from "react";

import { withFirebase } from "../Firebase";

class addResource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceName: "",
      shortDescription: "",
      description: "",
      url: "",
      availableDownload: "",
      application: "",
      name: "",
      loading: false,
      services: [],
    };
  }

  onChangeContent = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateResource = (event) => {
    /**
     * TODO: 1. Get the value of the Service input field
     * TODO: 2. Retrieve the ID of the service from firebase
     * TODO: 3. Add the resource to firebase.
     * TODO: 4. use the fan out process to create the link between tables
     */
    // let serviceName = this.state.name;
    // let serviceID;
    // this.props.firebase
    //   .services(this.props.match.params.name)
    //   .on("value", (snapshot) => {
    //     this.setState({ sid: snapshot.key });
    //   });

    // serviceID = this.state.sid;
    // console.log(serviceID)

    // ? Add resource to firebase
    // var newResourceRef = this.props.firebase.resources().push({
    //   resourceName: this.state.resourceName,
    //   name: this.state.name,
    //   shortDescription: this.state.shortDescription,
    //   description: this.state.description,
    //   url: this.state.url,
    //   availableDownload: this.state.availableDownload,
    //   application: this.state.application,
    // });

    this.props.firebase.resources().push({
      resourceName: this.state.resourceName,
      name: this.state.name,
      shortDescription: this.state.shortDescription,
      description: this.state.description,
      url: this.state.url,
      availableDownload: this.state.availableDownload,
      application: this.state.application,
    });

    this.setState({
      resourceName: "",
      name: "",
      shortDescription: "",
      description: "",
      url: "",
      availableDownload: "",
      application: "",
    });

    // let resourceId = newResourceRef.key;

    // let updates = {
    //   [`resource_service/${resourceId}/${serviceID}`]: true,
    //   [`service_resource/${serviceID}/${resourceId}`]: true,
    // };

    // this.props.firebase.database.ref().update(updates);
  };

  //   componentDidMount() {
  //     this.setState({ loading: true });

  //     //  ? gets list of services to populate the dropdown
  //     this.props.firebase.services().on("value", (snapshot) => {
  //       const servicesObject = snapshot.val();

  //       if (servicesObject) {
  //         const servicesList = Object.keys(servicesObject).map((key) => ({
  //           ...servicesObject[key],
  //           sid: key,
  //         }));

  //         this.setState({ services: servicesList, loading: false });
  //       } else {
  //         this.setState({ services: null, loading: false });
  //       }
  //     });
  //   }

  //   componentWillUnmount() {
  //     this.props.firebase.services().off();
  //   }

  render() {
    // const { services, loading } = this.state;
    const {
      resourceName,
      shortDescription,
      description,
      url,
      availableDownload,
      application,
      name,
    } = this.state;

    return (
      <div className="services">
        <div className="services__heading"></div>
        <form
          className="form"
          onSubmit={(event) => this.onCreateResource(event)}
        >
          <div className="form__group">
            <label htmlFor="name" className="form__label form__group__label">
              Service:
            </label>
            <input
              name="name"
              value={name}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--sm"
              placeholder="Enter name of service"
            />
            {/* {services ? (
              <select
                name="services"
                id="serviceList"
                className="form__input form__group--sm"
                onChange={this.onChangeContent}
                value={name}
              >
                {services.map((service) => (
                  <option key={service.sid} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            ) : (
              <h4 className="heading-4">No Services available...</h4>
            )} */}
          </div>
          <div className="form__group">
            <label
              htmlFor="resourceName"
              className="form__label form__group__label"
            >
              Resource Name
            </label>
            <input
              name="resourceName"
              value={resourceName}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--sm"
              placeholder="Enter name of resource"
            />
          </div>
          <div className="form__group">
            <label htmlFor="url" className="form__label form__group__label">
              website
            </label>
            <input
              name="url"
              value={url}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--sm"
              placeholder="Enter website url"
            />
          </div>
          <div className="form__group">
            <label
              htmlFor="availableDownload"
              className="form__label form__group__label"
            >
              Available Download
            </label>
            <input
              name="availableDownload"
              value={availableDownload}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--sm"
              placeholder="Enter path to downloadable content"
            />
          </div>
          <div className="form__group">
            <label
              htmlFor="application"
              className="form__label form__group__label"
            >
              Application for assistane
            </label>
            <input
              name="application"
              value={application}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--sm"
              placeholder="Enter path to application"
            />
          </div>
          <div className="form__group">
            <label
              htmlFor="shortDescription"
              className="form__label form__group__label"
            >
              Short Description
            </label>
            <input
              name="shortDescription"
              value={shortDescription}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--md"
              placeholder="Enter short description"
            />
          </div>
          <div className="form__group">
            <label
              htmlFor="description"
              className="form__label form__group__label"
            >
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--lg"
              placeholder="Description of service"
            />
          </div>
          <div className="form__group">
            <button className="form__group--sm btn btn--submit" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withFirebase(addResource);
