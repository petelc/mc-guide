import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import Header from "../Header";

// TODO SignUpPage will create the entire structure the form will be rendered in.
const SignUpPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="heading-1">Sign Up</h1>
        <SignUpForm />
      </div>
    </>
  );
};

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then((authUser) => {
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

  onChangedCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="form__group">
          <label htmlFor="username" className="form_label">
            Full Name
          </label>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            className="form__input"
            defaultValue="Zoey"
          />
        </div>
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
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordOne" className="form_label">
            Password
          </label>
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            className="form__input"
            autoComplete="new password"
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordTwo" className="form_label">
            Confirm Password
          </label>
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            className="form__input"
            autoComplete="confirm password"
          />
        </div>
        <div className="form__group">
          <label htmlFor="isAdmin" className="form_label">
            Admin:
          </label>
          <input
            name="isAdmin"
            onChange={this.onChangedCheckbox}
            type="checkbox"
            checked={isAdmin}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <button disabled={isInvalid} type="submit" className="btn--yellow">
            Sign Up
          </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    <Link to={ROUTES.SIGN_UP} className="shelf__link">
      Register a User
    </Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
