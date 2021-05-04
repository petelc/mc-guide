import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { withFirebase } from "../Firebase";

/**
 * ? This handles the file upload control and sets the file and progress state
 */

const FileUpload = (props) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [description, setDescription] = useState(null);
  const [progress, setProgress] = useState(0);
  const [img_path, setImgPath] = useState(null);

  //   TODO find out what file type a pdf and word document would be
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      // ? References
      const myStorage = props.firebase.storage;

      const storageRef = myStorage.ref();
      const fileRef = storageRef.child("images/" + selected.name);

      fileRef.put(selected).then(
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);

          snap.ref.getDownloadURL().then(function (url) {
            setImgPath(url);
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

  const onChangeContent = (e) => {
    // ? Test the name of the event and set the corresponding state
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        console.log(e.target.value);
        break;
      case "shortDescription":
        setShortDescription(e.target.value);
        console.log(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        console.log(e.target.value);
        break;
      default:
        break;
    }
  };

  const onCreateService = (event) => {
    props.firebase.services().push({
      img_path: img_path,
      name: name,
      shortDescription: shortDescription,
      description: description,
    });
    console.log("success pushing to firebase");
    setImgPath("");
    setName("");
    setShortDescription("");
    setDescription("");

    event.preventDefault();
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <form className="form" onSubmit={(event) => onCreateService(event)}>
        <div className="form__group">
          <label className="form__label form__group__label" htmlFor="file">
            Select file to upload
          </label>
          <input
            className="form__input form__group--md"
            type="file"
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
          <label className="form__label form__group__label">Image Path</label>
          <p className="form__label form__group__label">{img_path}</p>
        </div>
        <div className="form__group">
          <label htmlFor="name" className="form__label form__group__label">
            Service Type
          </label>
          <input
            name="name"
            value={name}
            onChange={onChangeContent}
            type="text"
            className="form__input form__group--sm"
            placeholder="Type of Service"
          />
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
            placeholder="Short description of service"
          />
        </div>
        <div className="form__group">
          <label
            htmlFor="description"
            className="form__label form__group__label"
          >
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={onChangeContent}
            type="text"
            className="form__input form__group--lg"
            placeholder="Description of service"
          />
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

export default withFirebase(FileUpload);
