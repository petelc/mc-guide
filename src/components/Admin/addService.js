import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

class AddService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      description: "",
    };
  }

  render() {
    return (
      <div>
        <p>Coming soon</p>
      </div>
    );
  }
}

export default withFirebase(AddService);
