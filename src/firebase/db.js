import { db } from "./firebase";

// * User API

export const doCreateUser = (id, username, email, roles) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    roles,
  });

export const onceGetUsers = () => db.ref("users").once("value");

// TODO create Services API and Resources API

//  * SERVICES API

export const doCreateService = (
  name,
  shortDescription,
  description,
  img_path
) =>
  db.ref("services").set({
    name,
    shortDescription,
    description,
    img_path,
  });

export const onceGetServices = () => db.ref("services").once("value");

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
  db.ref(`resources`).set({
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

export const onceGetResources = () => db.ref("resources").once("value");
