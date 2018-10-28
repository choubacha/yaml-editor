import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stringActions from "../actions/strings";

import Search from "../components/Search";

class SearchContainer extends React.Component {
  render() {
    const { entities, results, stringActions } = this.props;

    return <Search results={results} entities={entities} onUpdateString={stringActions.updateString} onSearch={stringActions.fetchStrings} />;
  }
}

const mapDispatchToProps = dispatch => ({
  stringActions: bindActionCreators(stringActions, dispatch)
});

const mapStateToProps = state => {
  const { strings } = state;

  return {
    results: strings
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
