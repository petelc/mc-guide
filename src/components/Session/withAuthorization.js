import React from "react";
import { withRouter } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import AuthUserContext from "./context";
import { firebase } from "../../firebase";

import * as ROUTES from "../../constants/routes";

const WithAuthorization = (Component, props) => {
  const [user, loading, error] = useAuthState(firebase.auth(), {
    onUserChanged: async (user) => {
      if (!!user) {
        props.history.push(ROUTES.SIGN_IN);
      }
    },
  });

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <AuthUserContext.Consumer>
        {(user) => (user ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  }
  // class WithAuthorization extends React.Component {
  //   componentDidMount() {
  //     this.listener = firebase.auth.onAuthStateChanged((authUser) => {
  //       if (!condition(authUser)) {
  //         this.props.history.push(ROUTES.SIGN_IN);
  //       }
  //     });
  //   }

  //   componentWillUnmount() {
  //     this.listener();
  //   }
  //   render() {
  //     return (
  //       <AuthUserContext.Consumer>
  //         {(authUser) => (authUser ? <Component {...this.props} /> : null)}
  //       </AuthUserContext.Consumer>
  //     );
  //   }
  // }
  // return withRouter(WithAuthorization);
};

export default withRouter(WithAuthorization);
