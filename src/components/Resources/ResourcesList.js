import React from "react";

import ResourcesItem from "./ResourcesItem";

const ResourcesList = ({ resources }) => (
  <>
    {resources.map((resource) => (
      <div className="resource">
        <ResourcesItem key={resource.rid} resource={resource} />
      </div>
    ))}
  </>
);

export default ResourcesList;
