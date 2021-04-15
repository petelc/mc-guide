import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navigation from "../Navigation";
import Landing from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForgot";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import AboutPage from "../About";
import ContactPage from "../Contact";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

import "../../sass/main.scss";

const App = () => (
  <Router>
    <div>
      {/* <Navigation /> */}

      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.CONTACT} component={ContactPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
