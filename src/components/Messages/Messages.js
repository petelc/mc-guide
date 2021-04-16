import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import MessageList from "./MessageList";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on("value", (snapshot) => {
      const messageObject = snapshot.val();

      if (messageObject) {
        // TODO convert messages to list from snapshot

        const messageList = Object.keys(messageObject).map((key) => ({
          ...messageObject[key],
          uid: key,
        }));

        this.setState({ messages: messageList, loading: false });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    console.log(event.target.value);
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
    });
    this.setState({ text: "" });

    event.preventDefault();
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <>
            <div className="house__cards">
              {loading && <div>Loading ....</div>}
              {messages ? (
                <MessageList messages={messages} />
              ) : (
                <div>There are no messages ...</div>
              )}
            </div>
            <form
              className="form"
              onSubmit={(event) => this.onCreateMessage(event, authUser)}
            >
              <input type="text" value={text} onChange={this.onChangeText} />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
