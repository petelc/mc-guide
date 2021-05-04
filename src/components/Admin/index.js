import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
// import AddResource from "./addResource";
import Header from "../Header";
import { SignUpLink } from "../SignUp";
import { FileUpload } from "../Upload";
import { NewResource } from "../AddResource";

import * as ROUTES from "../../constants/routes";
/**
 *
 * @param {*} props
 * @returns
 *
 * TODO Build navigation in the sidebar
 * TODO Create a list of resources (all)
 * TODO ADD Edit - Delete functionality <icons by each item>
 */

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
                <Link to={ROUTES.ADMIN_RESOURCES}>Edit Resources</Link>
              </div>
              <div className="block__content">
                <div className="block__content__row-1"></div>
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
