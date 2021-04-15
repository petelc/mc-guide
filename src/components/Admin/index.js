import React from "react";

import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";

const Admin = () => (
  <div className="container">
    <h1 className="heading-1">Admin</h1>
    <p>Coming Soon</p>
  </div>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(Admin);
