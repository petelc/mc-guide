import React from "react";
import { withRouter } from "react-router-dom";

import { firebase } from "../../firebase";
import * as ROUTES from "../../constants/routes";

const SignOutButton = (props) => {
  const signout = () => {
    firebase.auth.signOut();
    props.history.push(ROUTES.LANDING);
  };
  return (
    <div type="button" onClick={signout} className="navigation__link">
      <img src="/img/user-remove.svg" alt="Sign Out" />
    </div>
  );
};

export default withRouter(SignOutButton);
