import React from "react";
// import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";
// import parse, { attributesToProps } from "html-react-parser";

import ResourcesItem from "./ResourcesItem";

const ResourcesList = ({ resources }) => (
  <>
    {Object.keys.map((resources) => (resource) => (
      <div className="resource">
        <ResourcesItem key={resource.key} resource={resource} />
      </div>
    ))}
  </>
);

export default ResourcesList;
