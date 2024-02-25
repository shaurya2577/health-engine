import React from "react";
import ResourceCard from "./ResourceDashboard/ResourceCard";

function ResourceDashboard(props) {
  const { filteredResources } = props;
  return (
    <div className="grid grid-cols-3 gap-8 my-10">
      {filteredResources.map((resource_entry) => (
        <div key={resource_entry.resource_id}>
          <ResourceCard
            title={resource_entry.title}
            description={resource_entry.description}
            tag={resource_entry.class}
            link={resource_entry.link}
          ></ResourceCard>
        </div>
      ))}
    </div>
  );
}

export default ResourceDashboard;
