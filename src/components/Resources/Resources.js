import React, { Component } from "react";

// import { withFirebase } from "../Firebase";
import { db } from "../../firebase";
import ResourcesList from "./ResourcesList";
import Header from "../Header";

class ResourcesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      open: false,
      resources: {},
    };
  }

  componentDidMount() {
    const name = this.props.location.search.substring(3).toString();
    if (name) {
      db.onceGetResources(name).then((snapshot) =>
        this.setState(() => ({ resources: snapshot.val() }))
      );
    } else {
      this.setState({ resources: null });
    }

    // this.setState({ loading: true });
    // // const name = this.props.name;
    // const name = this.props.location.search.substring(3).toString();
    // if (name) {
    //   this.props.firebase
    //     .resources()
    //     .orderByChild("name")
    //     .equalTo(name)
    //     .on("value", (snapshot) => {
    //       const data = snapshot.val();
    //       if (data) {
    //         const dataList = Object.keys(data).map((key) => ({
    //           ...data[key],
    //           rid: key,
    //         }));
    //         this.setState({ resources: dataList, loading: false });
    //       } else {
    //         this.setState({ resources: null, loading: false });
    //       }
    //     });
    // } else {
    //   this.setState({ resources: null, loading: false });
    // }
  }

  // componentWillUnmount() {
  //   this.props.firebase.resources().off();
  // }

  render() {
    const { resources } = this.state;
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
                {/* {loading && <div>Loading...</div>} */}
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

export default ResourcesPage;
