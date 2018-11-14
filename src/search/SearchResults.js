import React from "react";
import { PropView } from "../props";
import DisplaySampleClasses from "../props/DisplaySampleClasses";
import Heading from "../components/Heading";

const searchInConfig = (config, tests) =>
  tests
    .map(test => config.props.filter(test))
    .reduce((acc, x) => acc.concat(x), []);

const searchFor = (searchTerm, config) => {
  if (searchTerm === "") return [];
  const regExpEscape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); // eslint-disable-line no-useless-escape
  const searchRegex = new RegExp(regExpEscape(searchTerm));
  const searchResults = searchInConfig(config, [
    propConfig => searchRegex.test(propConfig.prop),
    propConfig => searchRegex.test(propConfig.propName),
    propConfig =>
      propConfig.keywordValues
        ? Object.keys(propConfig.keywordValues.values).filter(value =>
            searchRegex.test(value)
          ).length > 0
        : false,
    propConfig =>
      propConfig.keywordValues
        ? Object.values(propConfig.keywordValues.values).filter(value =>
            searchRegex.test(value)
          ).length > 0
        : false
  ]);
  return [...new Set(searchResults)];
};

const SearchResults = ({ config, searchTerm }) => {
  const results = searchFor(searchTerm, config);
  const setRegex = new RegExp("[., ]", "g");
  const isClassSet = setRegex.test(searchTerm);
  const cleanedSearchTerm = isClassSet
    ? searchTerm.replace(setRegex, " ")
    : searchTerm;
  return (
    <div>
      <Heading level="2" className="px5 pt5">
        Search results
      </Heading>
      {results.length > 0 ? (
        <div>
          {results.map(result => (
            <PropView prop={result} config={config} />
          ))}
        </div>
      ) : (
        <div className="p5">
          <DisplaySampleClasses
            title="Available classes:"
            classNames={cleanedSearchTerm.split(" ")}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
