import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <div type="button" onClick={firebase.doSignOut} className="navigation__link">
    <img src="/img/user-remove.svg" alt="Sign Out" />
  </div>
);

export default withFirebase(SignOutButton);
