import React from "react";
import { Table, TextInput, Button } from "evergreen-ui";

export default class ValueItem extends React.PureComponent {
  constructor(props) {
    super(props);

    const { resultValues } = this.props;

    this.state = {
      original: resultValues,
      value: resultValues
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
        <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0} textAlign="right">
          <Button height={24} appearance="primary" onClick={() => this.props.onUpdateString(entitySlug, resultKey, this.state.value)}>
            Update
          </Button>
          <Button height={24} marginLeft={5} appearance="minimal" intent="danger" onClick={e => this.setState({ value: this.state.original })}>
            Cancel
          </Button>
        </Table.TextCell>
      </Table.Row>
    );
  }
}
