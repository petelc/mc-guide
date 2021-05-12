import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import Header from "../Header";

import { firebase } from "../../firebase";

import * as ROUTES from "../../constants/routes";

const SignInPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(firebase.auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    // return props.history.push(ROUTES.HOME);
    return (
      <>
        <Header />
        <div className="container">
          <div className="block">
            <div className="block__heading">
              <h2 className="heading-2">Welcome!</h2>
            </div>
            <div className="block__side-bar"></div>
            <div className="block__content">
              <div className="block__content__row-1">
                <Link to={ROUTES.ADMIN}>CONTINUE</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="block">
          <div className="block__heading">
            <h1 className="heading-1">Sign In</h1>
          </div>
          <div className="block__side-bar"></div>
          <div className="block__content">
            <div className="block__content__row-1">
              <form
                onSubmit={() => signInWithEmailAndPassword(email, password)}
                className="form"
              >
                <div className="form__group">
                  <label
                    htmlFor="email"
                    className="form__label form__group__label"
                  >
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="form__input form__group--md"
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
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form__input form__group--sm"
                    autoComplete="new password"
                    placeholder="Password"
                  />
                </div>

                <div className="form__group">
                  <button
                    type="submit"
                    className="form__group--sm btn btn--submit"
                  >
                    Sign In
                  </button>
                </div>

                {error && <p>{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// const INITIAL_STATE = {
//   email: "",
//   password: "",
//   error: null,
// };
// class SignInFormBase extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { ...INITIAL_STATE };
//   }

//   onSubmit = (event) => {
//     const { email, password } = this.state;
//     const { history } = this.props;
//     auth
//       .doSignInWithEmailAndPassword(email, password)
//       .then(() => {
//         this.setState(() => ({ ...INITIAL_STATE }));
//         history.push(ROUTES.HOME);
//       })
//       .catch((error) => {
//         this.setState({ error });
//       });
//     event.preventDefault();
//   };

//   onChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   render() {
//     const { email, password, error } = this.state;

//     const isInvalid = password === "" || email === "";

//     return (
//       <form onSubmit={this.onSubmit} className="form">
//         <div className="form__group">
//           <label htmlFor="email" className="form__label form__group__label">
//             Email Address
//           </label>
//           <input
//             name="email"
//             value={email}
//             onChange={this.onChange}
//             type="text"
//             className="form__input form__group--md"
//             placeholder="Email Address"
//           />
//         </div>
//         <div className="form__group">
//           <label htmlFor="password" className="form_label">
//             Password
//           </label>
//           <input
//             name="password"
//             value={password}
//             onChange={this.onChange}
//             type="password"
//             className="form__input form__group--sm"
//             autoComplete="new password"
//             placeholder="Password"
//           />
//         </div>

//         <div className="form__group">
//           <button
//             disabled={isInvalid}
//             type="submit"
//             className="form__group--sm btn btn--submit"
//           >
//             Sign In
//           </button>
//         </div>

//         {error && <p>{error.message}</p>}
//       </form>
//     );
//   }
// }

// const SignInForm = withRouter(SignInFormBase);

export default withRouter(SignInPage);
