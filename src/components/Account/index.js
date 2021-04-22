import React from "react";

import Header from "../Header";
import { AuthUserContext, withAuthorization } from "../Session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <>
        <Header />
        <div className="container">
          <h1 className="heading-1">Account: {authUser.email}</h1>
          <p>I have to be signed into here</p>
        </div>
      </>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
