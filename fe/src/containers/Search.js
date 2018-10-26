import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stringActions from "../actions";

import Search from "../components/Search";

class SearchContainer extends React.Component {
  componentDidMount() {
    this.props.stringActions.fetchStrings();
  }

  render() {
    const { results, stringActions } = this.props;

    return <Search results={results} onUpdateString={stringActions.updateString} onSearch={stringActions.fetchStrings} />;
  }
}

const mapDispatchToProps = dispatch => ({
  stringActions: bindActionCreators(stringActions, dispatch)
});

const mapStateToProps = state => {
  console.log(state);
  const { strings } = state;

  return {
    results: strings
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
