import React from "react";

import ResourcesItem from "./ResourcesItem";

const ResourcesList = ({ resources }) => (
  <>
    {resources.map((resource) => (
      <div className="resource">
        <ResourcesItem key={resource.key} resource={resource} />
      </div>
    ))}
  </>
);

export default ResourcesList;
