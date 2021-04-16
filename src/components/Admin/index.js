import React, { Component } from "react";
// import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
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
          <div className="container">
            <h1 className="heading-1">Admin</h1>
            <div className="house__cards">
              {loading && <div>Loading....</div>}
              {users ? (
                <UserList users={users} />
              ) : (
                <div>There are no users....</div>
              )}
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const UserList = ({ users }) => (
  <div className="house__card">
    {users.map((user) => (
      <UserItem key={user.uid} user={user} />
    ))}
  </div>
);

const UserItem = ({ user }) => (
  <>
    <h4 className="house__card__title">{user.uid}</h4>
    <div className="house__card__text">{user.username}</div>
  </>
);

// const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

// export default compose(withAuthorization(condition), withFirebase)(AdminPage);

// export default withAuthorization(condition)(Admin);
export default withFirebase(AdminPage);
