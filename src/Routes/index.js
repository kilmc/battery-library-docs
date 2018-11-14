import React from "react";
import { Route } from "react-router-dom";
import { PropView } from "../props";
import { PluginView } from "../plugins";
import { flattenMenuTree } from "../build-menu-trees";
import SearchResults from "../search/SearchResults";
import StaticLibraryView from "../StaticView/";

const Routes = ({ config, tree, searchTerm }) => {
  console.log(config);
  const { props, plugins, staticLibrary } = config;
  const propViews = flattenMenuTree(tree.filter(x => x.title === "Props"));
  const pluginViews = flattenMenuTree(tree.filter(x => x.title === "Plugins"));
  return (
    <div className="shrink1">
      {propViews.map((item, i) => (
        <Route
          key={item + i}
          path={item.path}
          render={() => (
            <PropView
              prop={props.filter(prop => prop.prop === item.title)[0]}
              config={config}
            />
          )}
        />
      ))}
      {pluginViews.map((item, i) => (
        <Route
          key={item + i}
          path={item.path}
          render={() => (
            <PluginView
              plugin={plugins.filter(plugin => plugin.name === item.title)[0]}
              config={config}
            />
          )}
        />
      ))}
      <Route
        path={"/search"}
        render={() => <SearchResults searchTerm={searchTerm} config={config} />}
      />
      <Route
        path={"/static"}
        render={() => {
          return <StaticLibraryView lib={staticLibrary} />;
        }}
      />
    </div>
  );
};

export default Routes;
