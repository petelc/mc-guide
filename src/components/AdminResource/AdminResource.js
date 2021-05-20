import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useAuthState } from "react-firebase-hooks/auth";

// import { withFirebase } from "../Firebase";
import { firebase } from "../../firebase";
// import { WithAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import Header from "../Header";

// ? Maybe I should create a Resource Service and put in the database operations

const AdminResource = (props) => {
  const [user, loading, error] = useAuthState(firebase.auth);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [availableDownload, setAvailableDownload] = useState(null);
  const [avLabel, setAvLabel] = useState(null);
  const [application, setApplication] = useState(null);
  const [appLabel, setAppLabel] = useState(null);
  const [resources, setResources] = useState(null);
  const [currentResource, setCurrentResource] = useState(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const types = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Danger Will Robinson something went wrong</p>;
  }

  const onDataChange = (items) => {
    let resources = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      resources.push({
        key: key,
        name: data.name,
        resourceName: data.resourceName,
        shortDescription: data.shortDescription,
        description: data.description,
        url: data.url,
        phone: data.phone,
        availableDownload: data.availableDownload,
        application: data.application,
      });
    });

    setResources(resources);
  };

  // useEffect(() => {
  //   //   TODO fetch resources here
  //   db.onceGetAllResources()
  //     .orderByChild("name")
  //     .then((snapshot) => onDataChange(snapshot.val()));

  //   // return () => props.firebase.resources().off("value", onDataChange);
  // }, []);

  const onRemoveResource = (key) => {
    firebase.db.onRemoveResource(key);
    // let resourcesRef = firebase.resources();
    // let resourceRef = resourcesRef.child(key);

    // resourceRef.remove();
  };

  const OnEditResource = (event) => {
    event.preventDefault();

    const data = {
      key: currentResource.key,
      name: currentResource.name,
      resourceName: currentResource.resourceName,
      url: currentResource.url,
      phone: currentResource.phone,
      shortDescription: currentResource.shortDescription,
      description: currentResource.description,
      availableDownload: availableDownload,
      avLabel: avLabel,
      application: application,
      appLabel: appLabel,
    };

    firebase.db
      .updateResource({ ...data })
      .then(() => setMessage("Resource updated successfully"));

    // let resourcesRef = props.firebase.resources();
    // let resourceRef = resourcesRef.child(data.key);

    // resourceRef
    //   .update(data)
    //   .then(() => {
    //     setMessage("Resource updated successfully");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setError(`ERROR: ${err}`);
    //   });

    // setCurrentResource(null);

    setOpen(false);
  };

  const OnOpenEditResource = (key) => {
    setOpen(true);
    setMessage("");
    firebase.db.onceGetResourcesByKey(key).then((snapshot) => {
      // let data = snapshot.val();
      setCurrentResource(snapshot.val());
    });
    // let resourcesRef = props.firebase.resources();
    // resourcesRef.child(key).on("value", (snapshot) => {
    //   let data = snapshot.val();
    //   console.log(data.resourceName);
    //   const datalist = {
    //     key: key,
    //     name: data.name,
    //     resourceName: data.resourceName,
    //     shortDescription: data.shortDescription,
    //     description: data.description,
    //     url: data.url,
    //     phone: data.phone,
    //     availableDownload: data.availableDownload,
    //     application: data.application,
    //   };

    // setCurrentResource(datalist);
  };

  const handleEditorChange = (content) => {
    setCurrentResource({ ...currentResource, description: content });
  };

  const onChangeContent = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log(name + " " + value);
    setCurrentResource({ ...currentResource, [name]: value });
  };

  const handleChange = (e) => {
    //   TODO get the filename and fileupload control name
    // let selected = e.target.files[0];
    // let fileType = e.target.name;
    // if (selected && types.includes(selected.type)) {
    //   setFile(selected);
    //   // ? References
    //   const myStorage = props.firebase.storage;
    //   const storageRef = myStorage.ref();
    //   const fileRef = storageRef.child("files/" + selected.name);
    //   fileRef.put(selected).then(
    //     (snap) => {
    //       let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    //       if (fileType === "downloads") {
    //         setProgress(percentage);
    //       }
    //       if (fileType === "application") {
    //         setProgress2(percentage);
    //       }
    //       snap.ref.getDownloadURL().then(function (url) {
    //         console.log("File available at", url);
    //         if (fileType === "downloads") {
    //           setAvailableDownload(url);
    //           setAvLabel(selected.name);
    //         }
    //         if (fileType === "application") {
    //           setApplication(url);
    //           setAppLabel(selected.name);
    //         }
    //       });
    //     },
    //     (err) => {
    //       setError(err);
    //       console.log(err);
    //     }
    //   );
    // } else {
    //   setFile(null);
    //   setError("Please select an image file");
    // }
  };

  return (
    <>
      {user ? (
        <>
          <Header />
          <div className="container">
            <div className="block">
              <div className="block__heading">
                <h2 className="heading-2">Admin Resources</h2>
              </div>
              <div className="block__side-bar">
                <h3 className="heading-3">Dashboard:</h3>
                <h4 className="heading-4">Coming Soon</h4>
              </div>

              <div className="block__content">
                <div className="admin">
                  <ul className="admin__list-header">
                    <li className="admin__heading-item--1">Resource Name</li>
                    <li className="admin__heading-item--2">
                      Resource Short Description
                    </li>
                    <li className="admin__heading-item--3"></li>
                    <li className="admin__heading-item--4"></li>
                  </ul>
                  <hr />
                  <ul className="admin__list">
                    {resources ? (
                      resources.map((resource, index) => (
                        <li className="admin__item" key={index}>
                          <p className="admin__item--1">
                            {resource.resourceName}
                          </p>
                          <p className="admin__item--2">
                            {resource.shortDescription}
                          </p>
                          <div className="admin__item--3">
                            <div
                              onClick={(event) =>
                                OnOpenEditResource(resource.key)
                              }
                            >
                              <img
                                className="admin__item--edit"
                                src="../../img/basic_elaboration_document_pencil.svg"
                                alt="edit"
                              />
                            </div>
                          </div>
                          <div className="admin__item--4">
                            <div
                              onClick={(event) =>
                                onRemoveResource(resource.key)
                              }
                            >
                              <img
                                className="admin__item--remove"
                                src="../../img/basic_trashcan_remove.svg"
                                alt="delete"
                              />
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div>There are no resources</div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)} center>
            <div className="admin__modal">
              {currentResource ? (
                <>
                  <div className="admin__modal__header">
                    Edit {currentResource.resourceName}
                  </div>
                  <div className="admin__modal__content">
                    {error && <div className="error">{error}</div>}
                    <form
                      className="form"
                      onSubmit={(event) => OnEditResource(event)}
                    >
                      <div className="form__group">
                        <label
                          htmlFor="name"
                          className="form__label form__group__label"
                        >
                          Service:
                        </label>
                        <input
                          name="name"
                          value={currentResource.name}
                          onChange={onChangeContent}
                          type="text"
                          className="form__input form__group--sm"
                          placeholder="Enter name of service"
                        />
                      </div>
                      <div className="form__group">
                        <label
                          htmlFor="resourceName"
                          className="form__label form__group__label"
                        >
                          Resource Name
                        </label>
                        <input
                          name="resourceName"
                          value={currentResource.resourceName}
                          onChange={onChangeContent}
                          type="text"
                          className="form__input form__group--sm"
                          placeholder="Enter name of resource"
                        />
                      </div>
                      <div className="form__group">
                        <label
                          htmlFor="url"
                          className="form__label form__group__label"
                        >
                          website
                        </label>
                        <input
                          name="url"
                          value={currentResource.url}
                          onChange={onChangeContent}
                          type="text"
                          className="form__input form__group--sm"
                          placeholder="Enter website url"
                        />
                      </div>
                      <div className="form__group">
                        <label
                          htmlFor="phone"
                          className="form__label form__group__label"
                        >
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          value={currentResource.phone}
                          onChange={onChangeContent}
                          type="text"
                          className="form__input form__group--sm"
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div className="form__group">
                        <label
                          className="form__label form__group__label"
                          htmlFor="file"
                        >
                          Select download file to upload
                        </label>
                        <input
                          className="form__input form__group--md"
                          type="file"
                          name="downloads"
                          onChange={handleChange}
                        />
                      </div>
                      {file && (
                        <div className="form__group">
                          <span className="form__input form__group_input">
                            <CircularProgressbar
                              value={progress}
                              text={`${progress}%`}
                            />
                          </span>
                        </div>
                      )}

                      <div className="form__group">
                        <label
                          htmlFor="availableDownload"
                          className="form__label form__group__label"
                        >
                          Available Download
                        </label>
                        <p className="form__label form__group__label">
                          {avLabel}
                        </p>
                      </div>

                      <div className="form__group">
                        <label
                          className="form__label form__group__label"
                          htmlFor="file"
                        >
                          Select application file to upload
                        </label>
                        <input
                          className="form__input form__group--md"
                          type="file"
                          name="application"
                          onChange={handleChange}
                        />
                      </div>
                      {file && (
                        <div className="form__group">
                          <span className="form__input form__group_input">
                            <CircularProgressbar
                              value={progress2}
                              text={`${progress2}%`}
                            />
                          </span>
                        </div>
                      )}
                      <div className="form__group">
                        <label
                          htmlFor="application"
                          className="form__label form__group__label"
                        >
                          Application for assistane
                        </label>
                        <p className="form__label form__group__label">
                          {appLabel}
                        </p>
                      </div>
                      <div className="form__group">
                        <label
                          htmlFor="shortDescription"
                          className="form__label form__group__label"
                        >
                          Short Description
                        </label>
                        <input
                          name="shortDescription"
                          value={currentResource.shortDescription}
                          onChange={onChangeContent}
                          type="text"
                          className="form__input form__group--md"
                          placeholder="Enter short description"
                        />
                      </div>

                      <div className="form__group">
                        <label
                          htmlFor="description"
                          className="form__label form__group__label"
                        >
                          Description
                        </label>
                        <div className="form__group--lg">
                          <SunEditor
                            name="description"
                            // value={description}
                            content={currentResource.description}
                            width="100%"
                            height="500px"
                            onChange={handleEditorChange}
                          />
                        </div>
                      </div>
                      <div className="form__group">
                        <p className="form__label form__group__label">
                          {message}
                        </p>
                      </div>
                      <div className="form__group">
                        <button
                          className="form__group--sm btn btn--submit"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div>No Resources</div>
              )}
            </div>
          </Modal>
        </>
      ) : (
        <div>
          <p>UnAuthorized</p>
        </div>
      )}
    </>
  );
};

export default AdminResource;
