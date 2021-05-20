import { firebase } from "../../firebase";

const db = firebase.db.ref("/users");

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
