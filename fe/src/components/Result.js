import React from "react";
import { Card, Table, Pane, TextInput, Button } from "evergreen-ui";

export default class Result extends React.PureComponent {
  constructor(props) {
    super(props);

    const { resultValue } = this.props;

    this.state = {
      original: resultValue,
      value: resultValue
    };
  }
  render() {
    const { resultKey, entitySlug } = this.props;

    return (
      <Table.Row key={resultKey}>
        <Table.TextCell width="100%" flexShrink={0} flexGrow={2}>
          {resultKey}
        </Table.TextCell>
        <Table.TextCell flexShrink={0} flexGrow={2}>
          <TextInput width="100%" onChange={e => this.setState({ value: e.target.value })} value={this.state.value} />
        </Table.TextCell>
        <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0} textAlign="right">
          <Button height={20} appearance="primary" intent="warning" onClick={() => this.props.onUpdateString(resultKey, [this.state.value])}>
            Save
          </Button>
        </Table.TextCell>
      </Table.Row>
    );
  }
}
