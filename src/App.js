import React from "react";
import { BrowserRouter } from "react-router-dom";
import { buildMenuTree } from "./build-menu-trees";
import Menu from "./Menu";
import Routes from "./Routes";

class Docs extends React.Component {
  constructor(props) {
    super(props);
    const { config } = this.props;
    this.menuTree = [
      buildMenuTree({
        config: config.props,
        rootTitle: "Props",
        titleKey: "prop",
        groupKey: "propGroup"
      }),
      buildMenuTree({
        config: config.plugins,
        rootTitle: "Plugins",
        titleKey: "name"
      })
    ];
    this.state = {
      searchTerm: "",
      menuVisible: "true"
    };
  }

  toggleVisibility = () => {
    this.setState(({ menuVisible }) => ({ menuVisible: !menuVisible }));
  };

  render() {
    return (
      <BrowserRouter>
        <div className="w100vw layout">
          <Menu
            tree={this.menuTree}
            onSearch={searchTerm => this.setState(() => ({ searchTerm }))}
            name={this.props.config.name}
            visible={this.state.menuVisible}
            toggleVisibility={this.toggleVisibility}
          />
          <Routes
            config={this.props.config}
            tree={this.menuTree}
            searchTerm={this.state.searchTerm}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Docs;
