import React from "react";
import { withRouter } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.hasURLSearchParam = window.location.search !== "";
    this.state = {
      searchTerm: this.hasURLSearchParam
        ? window.location.search.replace("?s=", "")
        : ""
    };
  }

  componentDidMount() {
    if (this.hasURLSearchParam) {
      this.onSearch(this.state.searchTerm);
    }
  }

  onSearch = value => {
    this.setState({ searchTerm: value });
    this.props.history.push(`/search?s=${this.state.searchTerm}`);
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <div className="sticky py4 t0 l0 mb5 bg-grey-300">
        <h2 className="text-center text-bold mb3">{this.props.name}</h2>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          value={this.state.searchTerm}
          onChange={e => this.onSearch(e.target.value)}
          placeholder="Search"
          className="p1 w100p type-18"
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
