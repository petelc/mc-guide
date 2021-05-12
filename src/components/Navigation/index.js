import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
// import * as ROLES from "../../constants/roles";
// import { AuthUserContext } from "../Session";
import { firebase } from "../../firebase";

const Navigation = ({ authUser }) => {
  const [user, loading, error] = useAuthState(firebase.auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Danger Will Robinson something went wrong</p>;
  }

  return (
    <div className="navigation">
      {user ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
      {/* <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer> */}
    </div>
  );
};

const NavigationAuth = ({ user }) => (
  <>
    <div className="navigation__item">
      <Link to={ROUTES.LANDING} className="navigation__link">
        Home
      </Link>
    </div>
    <div className="navigation__item">
      <Link to={ROUTES.HOME} className="navigation__link">
        Services
      </Link>
    </div>
    <div className="navigation__item">
      <Link to={ROUTES.ACCOUNT} className="navigation__link">
        Account
      </Link>
    </div>
    {/* {!!authUser.roles[ROLES.ADMIN] && ( */}
    <div className="navigation__item">
      <Link to={ROUTES.ADMIN} className="navigation__link">
        Admin
      </Link>
    </div>
    {/* )} */}

    <div className="navigation__item">
      <SignOutButton />
    </div>
  </>
);

const NavigationNonAuth = () => (
  <>
    <div className="navigation__item">
      <Link to={ROUTES.LANDING} className="navigation__link">
        Home
      </Link>
    </div>
    <div className="navigation__item">
      <Link to={ROUTES.HOME} className="navigation__link">
        Services
      </Link>
    </div>

    <div className="navigation__item">
      <Link to={ROUTES.ABOUT} className="navigation__link">
        About
      </Link>
    </div>
    <div className="navigation__item">
      <Link to={ROUTES.CONTACT} className="navigation__link">
        Contact
      </Link>
    </div>
    <div className="navigation__item">
      <Link to={ROUTES.SIGN_IN} className="navigation__link">
        <img src="/img/user.svg" alt="Sign In" />
      </Link>
    </div>
  </>
);

export default Navigation;
