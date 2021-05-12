import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Header from "../Header";

import { firebase } from "../../firebase";

const AccountPage = () => {
  const [user, loading, error] = useAuthState(firebase.auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Danger Will Robinson! something went wrong!</p>;
  }

  return (
    <>
      {user ? (
        <>
          <Header />
          <div className="container">
            <h1 className="heading-1">Account: {user.email}</h1>
            <p>I have to be signed into here</p>
          </div>
        </>
      ) : (
        <p>UnAuthorized</p>
      )}
    </>
  );
};

export default AccountPage;
