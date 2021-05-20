import { firebase } from "./firebase";

const userDb = firebase.ref("/users");
const servicesDb = firebase.ref("/services");
const resourcesDb = firebase.ref("/resources");

// * User API

const doCreateUser = (id, username, email, roles) =>
  userDb(`/${id}`).set({
    username,
    email,
    roles,
  });

export const onceGetUsers = () => userDb.once("value");

// TODO create Services API and Resources API

//  * SERVICES API

const doCreateService = (data) => {
  return servicesDb.push(data);
};

// export const onceGetServices = () => db.ref("services").once("value");

const getAllServices = () => {
  return servicesDb;
};

//  * RESOURCES API

export const doCreateResource = (
  name,
  resourceName,
  url,
  phone,
  shortDescription,
  description,
  availableDownload,
  avLabel,
  application,
  appLabel
) =>
  resourcesDb.push({
    name,
    resourceName,
    url,
    phone,
    shortDescription,
    description,
    availableDownload,
    avLabel,
    application,
    appLabel,
  });

// * gets resource by service name
// export const onceGetResources = (name) =>
//   db.ref(`resources/${name}`).once("value");

// * gets resource by key value
// export const onceGetResourceByKey = (key) =>
//   db.ref(`resources/${key}`).once("value");

// * gets all resources
const getAllResources = () => {
  return resourcesDb;
};
// export const onceGetAllResources = () => db.ref("resources").once("values");

//  * updates a resource
// export const updateResource = (
//   key,
//   name,
//   resourceName,
//   url,
//   phone,
//   shortDescription,
//   description,
//   availableDownload,
//   avLabel,
//   application,
//   appLabel
// ) =>
//   db
//     .ref(`resources/${key}`)
//     .update(
//       name,
//       resourceName,
//       url,
//       phone,
//       shortDescription,
//       description,
//       availableDownload,
//       avLabel,
//       application,
//       appLabel
//     );

// * removes a single resource
// export const onRemoveResource = (key) => db.ref(`resources/${key}`).remove();

export { doCreateUser, doCreateService, getAllServices, getAllResources };
