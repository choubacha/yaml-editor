import React from "react";
import { SearchInput } from "evergreen-ui";

import "../App.css";

export default class Search extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <SearchInput placeholder="Filter traits..." width="100%" />
      </div>
    );
  }
}
