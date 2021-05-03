import React from "react";

import ResourcesItem from "./ResourcesItem";

const ResourcesList = ({ resources }) => (
  <>
    {resources.map((resource) => (
      <div className="resource">
        <ResourcesItem key={resource.resourceName} resource={resource} />
      </div>
    ))}
  </>
);

export default ResourcesList;
