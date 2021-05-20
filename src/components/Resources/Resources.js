import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useList } from "react-firebase-hooks/database";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import parse, { attributesToProps } from "html-react-parser";

import Header from "../Header";
// import * as ROUTES from "../../constants/routes";
import { ResourcesDataProcessor } from "../Processor";

const Resources = (props) => {
  console.log(props);
  const [currentResource, setCurrentResource] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [resource, loading, error] = useList(ResourcesDataProcessor.getAll());

  const name = props.location.search.substring(3).toString();

  const [open, setOpen] = React.useState(false);
  const html = resource.description;
  let details = "";

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name === "main") {
        const props = attributesToProps(domNode.attribs);
        return <div {...props} />;
      }
    },
  };

  if (html) {
    details = parse(html, options);
  }

  if (loading) {
    return <div>LOADING...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // const refreshList = () => {
  //   setCurrentResource(null);
  //   setCurrentIndex(-1);
  // };

  const setActiveResource = (rscKey, index, event) => {
    console.log(rscKey);

    const result = resource.filter((rsc) => rsc.key === rscKey);
    console.log(result);
    const {
      // key: rscKey.val().key,
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
    } = rscKey.val();

    setCurrentResource({
      // key: result.key,
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

    setCurrentIndex(index);
    console.log(currentIndex);
    setOpen(true);
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="block">
          <div className="block__heading">
            <h2 className="heading-2">Resources</h2>
          </div>
          <div className="block__side-bar">
            <h3 className="heading-3">Service:</h3>
            <h3 className="heading-4">{name}</h3>
          </div>
          <div className="block__content">
            <div className="resources">
              {/* {loading && <div>Loading...</div>} */}
              {resource ? (
                resource
                  .filter((rsc) => rsc.val().name === name)
                  .map((rsc, index) => (
                    <>
                      <div className="shelf" key={rsc.val().key}>
                        <div className="shelf__header">
                          <p>{rsc.val().resourceName}</p>
                        </div>
                        <div className="shelf__actions"></div>
                        <div className="shelf__url">
                          <label className="shelf__label">Website:</label>
                          <a
                            href={`http://${rsc.val().url}`}
                            alt=""
                            className=" shelf__link"
                          >
                            {rsc.val().url}
                          </a>
                        </div>
                        <div className="shelf__phone">
                          <label className="shelf__label">Phone Number:</label>
                          <p className="shelf__phone__content">
                            {rsc.val().phone}
                          </p>
                        </div>
                        <div className="shelf__phone"></div>
                        <div className="shelf__short-content">
                          <p>{rsc.val().shortDescription}</p>
                        </div>
                        <div className="shelf__expand-content">
                          <button
                            className="icon__btn"
                            onClick={(event) =>
                              setActiveResource(rsc, index, event)
                            }
                          >
                            <img
                              src="/img/arrows_circle_down.png"
                              alt="expand"
                              className="icon__btn--img"
                            />
                          </button>
                        </div>
                      </div>
                      {/* Button should call set active resource  */}
                      <Modal open={open} onClose={() => setOpen(false)} center>
                        <div className="modal">
                          <div className="modal__header">
                            {currentResource.resourceName}
                          </div>
                          <div className="modal__resource--1">
                            {currentResource.url}
                          </div>
                          <div className="modal__resource--2">
                            <a
                              href={currentResource.availableDownload}
                              alt="download"
                              target="blank"
                            >
                              {currentResource.avLabel}
                            </a>
                          </div>
                          <div className="modal__resource--3">
                            <a
                              href={currentResource.application}
                              alt="application"
                              target="blank"
                            >
                              {currentResource.appLabel}
                            </a>
                          </div>
                          <div className="modal__content">{details}</div>
                        </div>
                      </Modal>
                    </>
                  ))
              ) : (
                <div>There are no resources...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
