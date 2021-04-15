import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import Header from "../Header";
import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="heading-1">Sign Up</h1>
        <SignInForm />
        <SignUpLink />
      </div>
    </>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="form__group">
          <label htmlFor="email" className="form_label">
            Email Address
          </label>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            className="form__input"
            placeholder="Email Address"
          />
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form_label">
            Password
          </label>
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            className="form__input"
            autoComplete="new password"
            placeholder="Password"
          />
        </div>

        <div className="form__group">
          <button disabled={isInvalid} type="submit" className="btn--yellow">
            Sign In
          </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;
