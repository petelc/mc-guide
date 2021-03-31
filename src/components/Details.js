import React from "react";

export const Details = (props) => {
  const { resources } = props.housing;
  const { title, description, url, img_path } = resources;
  //const t = resources.forEach((element) => element.title);
  console.log(resources);
  console.log(title);

  return (
    <div className="popup__content">
      {/* {resources.map((item) => (
        <> */}
      <div className="popup__left">
        <img src={img_path} alt={title} className="popup__img" />
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
      {/* </>
      ))} */}
    </div>
  );
};
