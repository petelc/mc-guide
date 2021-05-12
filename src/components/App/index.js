import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForgot";
import HomePage from "../Home";
import ResourcesPage from "../Resources";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import AboutPage from "../About";
import ContactPage from "../Contact";
import { AdminResource } from "../AdminResource";

import * as ROUTES from "../../constants/routes";
// import { WithAuthentication } from "../Session";

import "../../sass/main.scss";

const App = () => (
  <Router>
    <div>
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.RESOURCES} component={ResourcesPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.CONTACT} component={ContactPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.ADMIN_RESOURCES} component={AdminResource} />
    </div>
  </Router>
);

export default App;
// export default WithAuthentication(App);
