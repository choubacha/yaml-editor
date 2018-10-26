import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stringActions from "../actions";

import AddStrings from "../components/AddStrings";

class AddStringsContainer extends React.Component {
  render() {
    return <AddStrings onAddString={this.props.stringActions.addString} />;
  }
}

const mapDispatchToProps = dispatch => ({
  stringActions: bindActionCreators(stringActions, dispatch)
});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStringsContainer);
