import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import AuthUserContext from "./context";
import { firebase } from "../../firebase";

const WithAuthentication = (Component, props) => {
  const [user, loading, error] = useAuthState(firebase.auth());

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

  return (
    <AuthUserContext.Provider value={user}>
      <Component {...props} />
    </AuthUserContext.Provider>
  );
  // class WithAuthentication extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       authUser: null,
  //     };
  //   }

  //   componentDidMount() {
  //     this.listener = firebase.auth.onAuthStateChanged(
  //       (authUser) => {
  //         // localStorage.setItem("authUser", JSON.stringify(authUser));
  //         authUser
  //           ? this.setState(() => ({ authUser }))
  //           : this.setState(() => ({ authUser: null }));
  //       },
  //       () => {
  //         localStorage.removeItem("authUser");
  //         this.setState({ authUser: null });
  //       }
  //     );
  //   }

  //   componentWillUnmount() {
  //     this.listener();
  //   }

  //   render() {
  //     const { authUser } = this.state;
  //     return (
  //       <AuthUserContext.Provider value={authUser}>
  //         <Component {...this.props} />
  //       </AuthUserContext.Provider>
  //     );
  //   }
};

export default WithAuthentication;
