import React, { Component } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { withFirebase } from "../Firebase";

class addResource extends Component {
  constructor(props) {
    super(props);

    // this.editorRef = React.createRef();
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      resourceName: "",
      shortDescription: "",
      description: "",
      url: "",
      phone: "",
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

  handleChange = (content) => {
    this.setState({ description: content });
  };

  onCreateResource = (event) => {
    this.props.firebase.resources().push({
      resourceName: this.state.resourceName,
      name: this.state.name,
      shortDescription: this.state.shortDescription,
      description: this.state.description,
      url: this.state.url,
      phone: this.state.phone,
      availableDownload: this.state.availableDownload,
      application: this.state.application,
    });

    this.setState({
      resourceName: "",
      name: "",
      shortDescription: "",
      description: "",
      url: "",
      phone: "",
      availableDownload: "",
      application: "",
    });
  };

  render() {
    const {
      resourceName,
      shortDescription,
      description,
      url,
      phone,
      availableDownload,
      application,
      name,
    } = this.state;
    console.log(description);
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
            <label htmlFor="phone" className="form__label form__group__label">
              Phone Number
            </label>
            <input
              name="phone"
              value={phone}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--sm"
              placeholder="Enter phone number"
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
          {/* <div className="form__group">
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
          </div> */}
          <div className="form__group">
            <label
              htmlFor="description"
              className="form__label form__group__label"
            >
              Description
            </label>
            <div className="form__group--lg">
              <SunEditor
                name="description"
                value={description}
                width="100%"
                height="500px"
                onChange={this.handleChange}
              />
            </div>
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
