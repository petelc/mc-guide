import React from "react";

export const Details = (props) => {
  const { img_path, title, description, url } = props.housing;
  return (
    <div className="popup__content">
      <div className="popup__left">
        <img src={img_path} alt={props.title} className="popup__img" />
      </div>
      <div className="popup__right">
        <a href="#section-housing" alt="" className="popup__close">
          &times;
        </a>
        <h3 className="heading-3">{title}</h3>
        <p className="popup__text">{description}</p>
        <a href={url} alt="help">
          {url}
        </a>
      </div>
    </div>
  );
};
