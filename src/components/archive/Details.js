import React from "react";

export const Details = ({ details }) => {
  console.log({ details });

  let resourceItem = [];
  if (!details || details.length === 0) {
    return resourceItem.push(
      <div className="popup__left">
        <p>No Resources, Sorry!</p>
      </div>
    );
  } else {
    for (const resource in details) {
      console.log(details[resource]);

      resourceItem.push(
        <>
          <div className="popup__left">
            <img
              src={details[resource].img_path}
              alt={details[resource].shortDescription}
              className="popup__img"
            />
          </div>
          <div className="popup__right">
            <a href="#section-housing" alt="" className="popup__close">
              &times;
            </a>
            <h3 className="heading-3">{details[resource].shortDescription}</h3>
            <p className="popup__text">{details[resource].Description}</p>
            <a href={details[resource].url} alt="help">
              {details[resource].url}
            </a>
          </div>
        </>
      );
    }
    console.log(resourceItem);
  }

  return (
    <>
      <div className="popup__content">{resourceItem}</div>
    </>
  );
};
