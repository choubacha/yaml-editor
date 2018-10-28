import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as entityActions from "../actions/entities";

import App from "../components/App";

class AppContainer extends React.Component {
  componentDidMount() {
    this.props.entityActions.fetchEntities();
  }

  render() {
    const { entities } = this.props;

    return entities.length > 0 && <App entities={entities} />;
  }
}

const mapDispatchToProps = dispatch => ({
  entityActions: bindActionCreators(entityActions, dispatch)
});

const mapStateToProps = state => {
  let { entities } = state;

  return {
    entities
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
