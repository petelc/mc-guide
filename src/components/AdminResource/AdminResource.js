import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { withFirebase } from "../Firebase";
import Header from "../Header";

const AdminResource = (props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [key, setKey] = useState(null);
  const [resourceName, setResourceName] = useState(null);
  const [name, setName] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [phone, setPhone] = useState(null);
  // state objs for file uploads
  const [availableDownload, setAvailableDownload] = useState(null);
  const [avLabel, setAvLabel] = useState(null);
  const [application, setApplication] = useState(null);
  const [appLabel, setAppLabel] = useState(null);
  const [resources, setResources] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [currentResource, setCurrentResource] = useState(null);
  const [open, setOpen] = React.useState(false);

  const types = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

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

  useEffect(() => {
    //   TODO fetch resources here
    props.firebase.resources().orderByChild("name").on("value", onDataChange);

    return () => props.firebase.resources().off("value", onDataChange);
  }, [props.firebase]);

  const onRemoveResource = (key) => {
    let resourcesRef = props.firebase.resources();
    let resourceRef = resourcesRef.child(key);

    resourceRef.remove();
  };

  const OnEditResource = (e) => {
    let resourcesRef = props.firebase.resources();
    let resourceRef = resourcesRef.child(key);
    alert(e.target.value);
    alert(resourcesRef);
    alert(key);
    resourceRef
      .child(key)
      .update({
        name: name,
        resourceName: resourceName,
        shortDescription: shortDescription,
        description: description,
        application: application,
        appLabel: avLabel,
        availableDownload: availableDownload,
        avLabel: avLabel,
        url: url,
        phone: phone,
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();

    //     var adaNameRef = firebase.database().ref('users/ada/name');
    // // Modify the 'first' and 'last' properties, but leave other data at
    // // adaNameRef unchanged.
    // adaNameRef.update({ first: 'Ada', last: 'Lovelace' });

    // setResourceName("");
    // setName("");
    // setShortDescription("");
    // setDescription("");
    // setUrl("");
    // setPhone("");
    // setAvailableDownload("");
    // setAvLabel("");
    // setApplication("");
    // setAppLabel("");

    // setOpen(false);
  };

  const OnOpenEditResource = (key) => {
    setOpen(true);
    let resourcesRef = props.firebase.resources();
    resourcesRef.child(key).on("value", (snapshot) => {
      let data = snapshot.val();
      console.log(data.resourceName);
      // setKey(data.key);
      setName(data.name);

      setResourceName(data.resourceName);
      setShortDescription(data.shortDescription);
      setDescription(data.description);
      setApplication(data.application);
      setAppLabel(data.appLabel);
      setAvailableDownload(data.availableDownload);
      setAvLabel(data.avLabel);
      setUrl(data.url);
      setPhone(data.phone);
    });
  };

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const onChangeContent = (e) => {
    console.log(e);
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        console.log(e.target.value);
        break;
      case "shortDescription":
        setShortDescription(e.target.value);
        console.log(e.target.value);
        break;
      case "url":
        setUrl(e.target.value);
        console.log(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        console.log(e.target.value);
        break;
      case "resourceName":
        setResourceName(e.target.value);
        console.log(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    //   TODO get the filename and fileupload control name
    let selected = e.target.files[0];
    let fileType = e.target.name;

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      // ? References
      const myStorage = props.firebase.storage;

      const storageRef = myStorage.ref();
      const fileRef = storageRef.child("files/" + selected.name);

      fileRef.put(selected).then(
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          if (fileType === "downloads") {
            setProgress(percentage);
          }
          if (fileType === "application") {
            setProgress2(percentage);
          }

          snap.ref.getDownloadURL().then(function (url) {
            console.log("File available at", url);
            if (fileType === "downloads") {
              setAvailableDownload(url);
              setAvLabel(selected.name);
            }
            if (fileType === "application") {
              setApplication(url);
              setAppLabel(selected.name);
            }
          });
        },
        (err) => {
          setError(err);
          console.log(err);
        }
      );
    } else {
      setFile(null);
      setError("Please select an image file");
    }
  };

  return (
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
                      <p className="admin__item--1">{resource.resourceName}</p>
                      <p className="admin__item--2">
                        {resource.shortDescription}
                      </p>
                      <div className="admin__item--3">
                        <div
                          onClick={(event) => OnOpenEditResource(resource.key)}
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
                          onClick={(event) => onRemoveResource(resource.key)}
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
          {resources ? (
            <>
              <div className="admin__modal__header">Edit {resourceName}</div>
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
                      value={name}
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
                      value={resourceName}
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
                      value={url}
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
                      value={phone}
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
                      {availableDownload}
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
                    <p className="form__label form__group__label">{appLabel}</p>
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
                      value={shortDescription}
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
                        content={description}
                        width="100%"
                        height="500px"
                        onChange={handleEditorChange}
                      />
                    </div>
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
  );
};

export default withFirebase(AdminResource);
