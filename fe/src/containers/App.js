import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as keyActions from "../actions";

import Search from "../components/Search";

class AppContainer extends React.Component {
  componentDidMount() {
    this.props.keyActions.fetchStrings();
  }

  render() {
    const results = this.props.results;

    return <Search results={results} />;
  }
}

const mapDispatchToProps = dispatch => ({
  keyActions: bindActionCreators(keyActions, dispatch)
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
)(AppContainer);
