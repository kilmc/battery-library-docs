import React, { Fragment } from "react";
import config from "../config/battery.config";
import { generateCSS } from "@battery/core";
import Heading from "../components/Heading";
import ContentBlock from "../components/ContentBlock";

export const subtractArrays = (arr1, arr2) => {
  let returnArr = arr1;

  arr2.map(remove => {
    // eslint-disable-line array-callback-return
    const index = arr1.indexOf(remove);
    if (index !== -1) {
      returnArr.splice(index, 1);
    }
  });
  return returnArr;
};

const DisplaySampleClasses = ({
  title,
  classNames,
  checkAvailability = false
}) => {
  let available;
  let unavailable;

  if (config.staticLibrary) {
    if (checkAvailability) {
      available = classNames
        .filter(className => {
          return config.staticLibrary.includes(className);
        })
        .filter(x => x !== "");

      unavailable = subtractArrays(classNames, available).filter(x => x !== "");
    }
  }

  if (classNames === "") {
    return null;
  } else {
    return checkAvailability ? (
      <div className="mb5">
        {available.length > 0 && (
          <div className="mb5">
            <Heading level={3} className="mb3">
              {title}
            </Heading>
            <ContentBlock>{generateCSS(available, config)}</ContentBlock>
          </div>
        )}

        {unavailable.length > 0 && (
          <Fragment>
            <Heading level={3} className="mb1">
              Unavailable:
            </Heading>
            <p className="mb3">
              This class is valid but not currently available in our Atomic CSS
              package.
            </p>
            <ContentBlock>{generateCSS(unavailable, config)}</ContentBlock>
          </Fragment>
        )}
      </div>
    ) : (
      <div className="mb5">
        <Heading level={3} className="mb2">
          {title}
        </Heading>
        <ContentBlock>{generateCSS(classNames, config)}</ContentBlock>
      </div>
    );
  }
};

export default DisplaySampleClasses;
