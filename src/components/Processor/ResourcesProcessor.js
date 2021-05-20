import { firebase } from "../../firebase";

const db = firebase.db.ref("/resources");

const getAll = () => {
  return db;
};

const getByName = (name) => {
  return db.equalTo(name);
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

export { getAll, getByName, create, update, remove };
