import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// TODO Create second project on Firebase for production
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.store = app.storage();
  }

  // ? *** AUTH API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // ? *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();

            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // ? *** STORAGE REFERENCE ***
  storageRef = this.store.storage().ref();

  // ? *** USER API ***
  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // * *** MESSAGES API (For Testing) ***

  message = (uid) => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref("messages");

  // ? *** SERVICES API ***

  service = (name) => this.db.ref(`services/${name}`);

  services = () => this.db.ref(`services`);

  // ? *** RESOURCES API ***

  // ! gets the resource based on service id (I think)
  resource = (name) => this.db.ref(`resources/${name}`);

  resources = () => this.db.ref("resources");

  // TODO do i need the service-resource?
}

export default Firebase;
