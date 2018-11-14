import React from "react";
import Heading from "../components/Heading";

const PropHeader = ({ prop, keywords, plugin, subProps }) => {
  return (
    <div className="mb4 border-bottom border-thick pb3">
      <Heading level="2" className="mb2">
        {prop}
      </Heading>
      {subProps && <div>{subProps}</div>}
      {keywords && (
        <Heading level={3} className="mb2 grey-600 mono text-ellipsis clip ">
          <span>Keywords:</span> {keywords}
        </Heading>
      )}
      {plugin && (
        <h3 className="fz24px mb2 grey-600 mono text-ellipsis clip text-nowrap">
          <span>Plugin:</span> {plugin}
        </h3>
      )}
    </div>
  );
};

export default PropHeader;
