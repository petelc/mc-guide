import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import parse, { attributesToProps } from "html-react-parser";

const ResourcesItem = ({ resource }) => {
  const [open, setOpen] = React.useState(false);
  const html = resource.description;

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name === "main") {
        const props = attributesToProps(domNode.attribs);
        return <div {...props} />;
      }
    },
  };

  const details = parse(html, options);

  return (
    <>
      <div className="shelf">
        <div className="shelf__header">
          <p>{resource.resourceName}</p>
        </div>
        <div className="shelf__actions"></div>
        <div className="shelf__url">
          <label className="shelf__label">Website:</label>
          <a href={`http://${resource.url}`} alt="" className=" shelf__link">
            {resource.url}
          </a>
        </div>
        <div className="shelf__phone">
          <label className="shelf__label">Phone Number:</label>
          <p className="shelf__phone__content">{resource.phone}</p>
        </div>
        <div className="shelf__phone"></div>
        <div className="shelf__short-content">
          <p>{resource.shortDescription}</p>
        </div>
        <div className="shelf__expand-content">
          <button className="icon__btn" onClick={() => setOpen(true)}>
            <img
              src="/img/arrows_circle_down.png"
              alt="expand"
              className="icon__btn--img"
            />
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="modal">
          <div className="modal__header">{resource.resourceName}</div>
          <div className="modal__resource--1">{resource.url}</div>
          <div className="modal__resource--2">
            <a href={resource.availableDownload} alt="download" target="blank">
              {resource.avLabel}
            </a>
          </div>
          <div className="modal__resource--3">
            <a href={resource.application} alt="application" target="blank">
              {resource.appLabel}
            </a>
          </div>
          <div className="modal__content">{details}</div>
        </div>
      </Modal>
    </>
  );
};

export default ResourcesItem;
