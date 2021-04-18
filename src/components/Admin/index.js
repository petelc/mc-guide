import React, { Component } from "react";
// import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import AddService from "./addService";
import AddResource from "./addResource";
import Header from "../Header";
// import * as ROLES from "../../constants/roles";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", (snapshot) => {
      const userObject = snapshot.val();

      if (userObject) {
        const userList = Object.keys(userObject).map((key) => ({
          ...userObject[key],
          uid: key,
        }));
        this.setState({
          users: userList,
          loading: false,
        });
      } else {
        this.setState({ users: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

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
                  <p>some type of navigation goes here</p>
                </div>
                <div className="block__content">
                  <div className="block__content__row-1">
                    <h3 className="heading-3">Users:</h3>
                    {loading && <div>Loading....</div>}
                    {users ? (
                      <UserList users={users} />
                    ) : (
                      <div>There are no users....</div>
                    )}
                  </div>
                  <div className="block__content__row-2">
                    <h3 className="heading-3">Add New Service:</h3>
                    <AddService />
                  </div>
                  <div className="block__content__row-3">
                    <h3 className="heading-3">Add New Resource:</h3>
                    <AddResource />
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
  }
}

// TODO 1) Move User Listing to its own component.
// TODO 2) Handle Roles
const UserList = ({ users }) => (
  <div className="user">
    {users.map((user) => (
      <UserItem key={user.uid} user={user} />
    ))}
  </div>
);

const UserItem = ({ user }) => (
  <>
    <div className="user__column-1">{user.username}</div>
    <div className="user__column-2">{user.email}</div>
    <div className="user__column-3">{user.roles[0]}</div>
  </>
);

// const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

// export default compose(withAuthorization(condition), withFirebase)(AdminPage);

// export default withAuthorization(condition)(Admin);
export default withFirebase(AdminPage);
