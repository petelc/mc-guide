import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import * as ROUTES from "../../constants/routes";
import { firebase } from "../../firebase";
import { AuthDataProcessor } from "../Processor";

import Header from "../Header";

// TODO SignUpPage will create the entire structure the form will be rendered in.
const SignUpPage = () => {
  const initialAuthUserState = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    roles: "ADMIN",
    isAdmin: true,
    error: null,
  };
  const [authUser, setAuthUser] = useState(initialAuthUserState);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  // const [isValid, setIsValid] = useState(false);

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(firebase.auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthUser({ ...user, [name]: value });
    if (name === "email") {
      setEmail(value);
    }
    if (name === "passwordOne") {
      setPassword(value);
    }
  };

  const validatePasswords = () => {
    const isValid =
      authUser.passwordOne !== authUser.passwordTwo ||
      authUser.passwordOne === "" ||
      email === "" ||
      authUser.username === "";

    if (isValid) {
      return true;
    }

    return false;
  };

  const saveUser = () => {
    createUserWithEmailAndPassword(email, password)
      .then(() => {
        AuthDataProcessor.createUser(user.uid, authUser.username, email)
          .then(() => {
            setSubmitted(true);
          })
          .catch((error) => {
            console.log(error);
            setErr(error);
          });
      })
      .catch((error) => {
        setErr(error);
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="heading-1">Sign Up</h1>

        {submitted ? (
          <div className="form__group">
            <h4 className="heading-4">User saved successfully</h4>
          </div>
        ) : (
          <form onSubmit={saveUser} className="form">
            <div className="form__group">
              <label htmlFor="username" className="form_label">
                Full Name
              </label>
              <input
                name="username"
                value={authUser.username}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                value={authUser.passwordOne}
                onChange={handleInputChange}
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
                value={authUser.passwordTwo}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                type="checkbox"
                checked={authUser.isAdmin}
                className="form__input"
                disabled="true"
              />
            </div>
            <div className="form__group">
              <button
                disabled={() => validatePasswords()}
                type="submit"
                className="btn--yellow"
              >
                Sign Up
              </button>
            </div>
            {err && <p>{err.message}</p>}
            {error && <p>{error.message}</p>}
          </form>
        )}
      </div>
    </>
  );
};

// const INITIAL_STATE = {
//   username: "",
//   email: "",
//   passwordOne: "",
//   passwordTwo: "",
//   isAdmin: false,
//   error: null,
// };

// class SignUpForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { ...INITIAL_STATE };
//   }

//   onSubmit = (event) => {
//     const { username, email, passwordOne, isAdmin } = this.state;
//     const roles = {};
//     if (isAdmin) {
//       roles[ROLES.ADMIN] = ROLES.ADMIN;
//     }

//     firebase.auth
//       .doCreateUserWithEmailAndPassword(email, passwordOne)
//       .then((authUser) => {
//         firebase.db
//           .doCreateUser(authUser.user.uid, username, email)
//           .then(() => {
//             this.setState(() => ({ ...INITIAL_STATE }));
//             this.props.history.push(ROUTES.HOME);
//           })
//           .catch((error) => {
//             this.setState({ error });
//           });
//       })
//       .catch((error) => {
//         this.setState({ error });
//       });

//     event.preventDefault();
//   };

//   onChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   onChangedCheckbox = (event) => {
//     this.setState({ [event.target.name]: event.target.checked });
//   };

//   render() {
//     const {
//       username,
//       email,
//       passwordOne,
//       passwordTwo,
//       isAdmin,
//       error,
//     } = this.state;

//     const isInvalid =
//       passwordOne !== passwordTwo ||
//       passwordOne === "" ||
//       email === "" ||
//       username === "";

//     return (
//       <form onSubmit={this.onSubmit} className="form">
//         <div className="form__group">
//           <label htmlFor="username" className="form_label">
//             Full Name
//           </label>
//           <input
//             name="username"
//             value={username}
//             onChange={this.onChange}
//             type="text"
//             className="form__input"
//             defaultValue="Zoey"
//           />
//         </div>
//         <div className="form__group">
//           <label htmlFor="email" className="form_label">
//             Email Address
//           </label>
//           <input
//             name="email"
//             value={email}
//             onChange={this.onChange}
//             type="text"
//             className="form__input"
//           />
//         </div>
//         <div className="form__group">
//           <label htmlFor="passwordOne" className="form_label">
//             Password
//           </label>
//           <input
//             name="passwordOne"
//             value={passwordOne}
//             onChange={this.onChange}
//             type="password"
//             className="form__input"
//             autoComplete="new password"
//           />
//         </div>
//         <div className="form__group">
//           <label htmlFor="passwordTwo" className="form_label">
//             Confirm Password
//           </label>
//           <input
//             name="passwordTwo"
//             value={passwordTwo}
//             onChange={this.onChange}
//             type="password"
//             className="form__input"
//             autoComplete="confirm password"
//           />
//         </div>
//         <div className="form__group">
//           <label htmlFor="isAdmin" className="form_label">
//             Admin:
//           </label>
//           <input
//             name="isAdmin"
//             onChange={this.onChangedCheckbox}
//             type="checkbox"
//             checked={isAdmin}
//             className="form__input"
//           />
//         </div>
//         <div className="form__group">
//           <button disabled={isInvalid} type="submit" className="btn--yellow">
//             Sign Up
//           </button>
//         </div>

//         {error && <p>{error.message}</p>}
//       </form>
//     );
//   }
// }

const SignUpLink = () => (
  <p>
    <Link to={ROUTES.SIGN_UP} className="shelf__link">
      Register a User
    </Link>
  </p>
);

// const SignUpForm = withRouter(SignUpFormBase);

export default withRouter(SignUpPage);

export { SignUpLink };
