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
    const { resultKey } = this.props;

    return (
      <Table.Row key={resultKey}>
        <Table.TextCell width="100%" flexShrink={0} flexGrow={2}>
          {resultKey}
        </Table.TextCell>
        <Table.TextCell flexShrink={0} flexGrow={2}>
          <TextInput width="100%" onChange={e => this.setState({ value: e.target.value })} value={this.state.value} />
        </Table.TextCell>
        <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0} textAlign="right">
          <Button height={24} appearance="success" onClick={() => this.props.onUpdateString(resultKey, this.state.value)}>
            Update
          </Button>
          <Button height={24} marginLeft={5} appearance="minimal" intent="danger" onClick={e => this.setState({ value: this.state.original })}>
            Cancel
          </Button>
        </Table.TextCell>
      </Table.Row>

      // <Pane
      //   marginBottom="0.5rem"
      //   paddingTop="0.8rem"
      //   paddingBottom="0.8rem"
      //   borderBottom="1px solid #e0e0e0"
      //   key={resultKey}
      //   display="flex"
      //   justifyContent="space-between"
      //   alignItems="center"
      // >
      //   <Pane flex="3">{resultKey}</Pane>
      //   <TextInput flex="3" onChange={e => this.setState({ value: e.target.value })} value={this.state.value} />

      // </Pane>
    );
  }
}
