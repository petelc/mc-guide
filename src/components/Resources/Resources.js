import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import ResourcesList from "./ResourcesList";
import Header from "../Header";

class ResourcesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      open: false,
      resources: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    // const name = this.props.name;
    const name = this.props.location.search.substring(3).toString();
    console.log("in resource component mount");
    console.log(name);

    if (name) {
      this.props.firebase
        .resources()
        .orderByChild("name")
        .equalTo(name)
        .on("value", (snapshot) => {
          const data = snapshot.val();
          console.log(data);

          if (data) {
            const dataList = Object.keys(data).map((key) => ({
              ...data[key],
              rid: key,
            }));

            this.setState({ resources: dataList, loading: false });
          } else {
            this.setState({ resources: null, loading: false });
          }
        });
    } else {
      this.setState({ resources: null, loading: false });
    }
  }

  componentWillUnmount() {
    this.props.firebase.resources().off();
  }

  render() {
    const { loading, resources } = this.state;
    return (
      <>
        <Header />
        <div className="container">
          <div className="block">
            <div className="block__heading">
              <h2 className="heading-2">Resources</h2>
            </div>
            <div className="block__side-bar">
              <h3 className="heading-3">Service:</h3>
              <h3 className="heading-4">
                {this.props.location.search.substring(3)}
              </h3>
            </div>
            <div className="block__content">
              <div className="resources">
                {loading && <div>Loading...</div>}
                {resources ? (
                  <ResourcesList resources={resources} />
                ) : (
                  <div>There are no resources...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withFirebase(ResourcesPage);
