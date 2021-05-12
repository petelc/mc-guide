import { firebase } from "../../firebase";

const db = firebase.ref("/users");

// // ? firebase auth functions
// const doCreateUserWithEmailAndPassword = (email, password) =>
//   firebase.auth.createUserWithEmailAndPassword(email, password);

// // * Sign In
// const doSignInWithEmailAndPassword = (email, password) =>
//   firebase.auth.signInWithEmailAndPassword(email, password);

// // * Sign Out
// const doSignOut = () => firebase.auth.signOut();

// // * Password Reset
// const doPasswordReset = (email) => firebase.auth.sendPasswordResetEmail(email);

// // * Password Change
// const doPasswordUpdate = (password) =>
//   firebase.auth.currentUser.updatePassword(password);

// ? database auth functions
const getAll = () => {
  return db;
};

const create = (data) => {
  return db.push(data);
};

const update = (key, data) => {
  return db.child(key).update(data);
};

const remove = (key) => {
  return db.child(key).remove();
};

export { getAll, create, update, remove };
