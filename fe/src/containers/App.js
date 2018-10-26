import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as keyActions from "../actions";

import Search from "../components/Search";

class AppContainer extends React.Component {
  componentDidMount() {
    this.props.keyActions.fetchKeys();
  }

  render() {
    return <Search />;
  }
}

const mapDispatchToProps = dispatch => ({
  keyActions: bindActionCreators(keyActions, dispatch)
});

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
