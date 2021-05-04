import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { withFirebase } from "../Firebase";

const NewResource = (props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
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

  //   TODO Handle onChange for file uploads
  //  TODO Handle onChangeContent for other form fields
  //  TODO Handle SunEditor
  //  TODO Handle CreateResource
  const types = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

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

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const onChangeContent = (e) => {
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

  const onCreateResource = (e) => {
    props.firebase.resources().push({
      resourceName: resourceName,
      name: name,
      shortDescription: shortDescription,
      description: description,
      url: url,
      phone: phone,
      availableDownload: availableDownload,
      avLabel: avLabel,
      application: application,
      appLabel: appLabel,
    });

    setResourceName("");
    setName("");
    setShortDescription("");
    setDescription("");
    setUrl("");
    setPhone("");
    setAvailableDownload("");
    setAvLabel("");
    setApplication("");
    setAppLabel("");

    e.preventDefault();
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <form className="form" onSubmit={(event) => onCreateResource(event)}>
        <div className="form__group">
          <label htmlFor="name" className="form__label form__group__label">
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
          <label htmlFor="url" className="form__label form__group__label">
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
          <label htmlFor="phone" className="form__label form__group__label">
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
          <label className="form__label form__group__label" htmlFor="file">
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
              <CircularProgressbar value={progress} text={`${progress}%`} />
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
          <p className="form__label form__group__label">{availableDownload}</p>
        </div>

        <div className="form__group">
          <label className="form__label form__group__label" htmlFor="file">
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
              <CircularProgressbar value={progress2} text={`${progress2}%`} />
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
              value={description}
              content={description}
              width="100%"
              height="500px"
              onChange={handleEditorChange}
            />
          </div>
        </div>
        <div className="form__group">
          <button className="form__group--sm btn btn--submit" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default withFirebase(NewResource);
