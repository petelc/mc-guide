import React from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
// import AddResource from "./addResource";
import Header from "../Header";
import { SignUpLink } from "../SignUp";
import { FileUpload } from "../Upload";
import { NewResource } from "../AddResource";

const AdminPage = (props) => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <Header />
          <div className="container">
            <div className="block">
              <div className="block__heading">
                <h1 className="heading-1">Admin</h1>
              </div>
              <div className="block__side-bar">
                <SignUpLink />
              </div>
              <div className="block__content">
                <div className="block__content__row-1">
                  {/* <h3 className="heading-3">Users:</h3>
                  {loading && <div>Loading....</div>}
                  {users ? (
                    <UserList users={users} />
                  ) : (
                    <div>There are no users....</div>
                  )} */}
                </div>
                <div className="block__content__row-2">
                  <h3 className="heading-3">Add New Service:</h3>
                  <FileUpload />
                </div>
                <div className="block__content__row-3">
                  <h3 className="heading-3">Add New Resource:</h3>
                  <NewResource />
                </div>
              </div>
            </div>
            <div className="block__footing">
              <p>any type of footing content</p>
            </div>
          </div>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(AdminPage);
