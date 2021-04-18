import React, { Component } from "react";

import { withFirebase } from "../Firebase";

class AddService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img_path: "",
      name: "",
      shortDescription: "",
      description: "",
    };
  }

  onChangeContent = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateService = (event) => {
    this.props.firebase.services().push({
      img_path: this.state.img_path,
      name: this.state.name,
      shortDescription: this.state.shortDescription,
      description: this.state.description,
    });
    this.setState({
      img_path: "",
      name: "",
      shortDescription: "",
      description: "",
    });

    event.preventDefault();
  };

  render() {
    const { img_path, name, shortDescription, description } = this.state;

    return (
      <div className="services">
        <div className="services__heading"></div>
        <form
          className="form"
          onSubmit={(event) => this.onCreateService(event)}
        >
          <div className="form__group">
            <label
              htmlFor="img_path"
              className="form__label form__group__label"
            >
              Image
            </label>
            <input
              name="img_path"
              value={img_path}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--sm"
              placeholder="Enter path to image. ie /img/<filename.extension>"
            />
          </div>
          <div className="form__group">
            <label htmlFor="name" className="form__label form__group__label">
              Service Type
            </label>
            <input
              name="name"
              value={name}
              onChange={this.onChangeContent}
              type="text"
              className="form__input form__group--sm"
              placeholder="Type of Service"
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
              placeholder="Short description of service"
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

export default withFirebase(AddService);
