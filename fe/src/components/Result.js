import React from "react";
import { Text, Pane, Table, TextInput, Button } from "evergreen-ui";

export default class Result extends React.PureComponent {
  constructor(props) {
    super(props);

    const { resultValues } = this.props;
    this.state = {
      values: resultValues
    };
  }
  render() {
    const { resultKey, resultValues } = this.props;

    const resultValueElements = resultValues.map((value, index) => {
      return (
        <TextInput
          key={index}
          width="100%"
          marginTop="0.5rem"
          marginBottom="0.5rem"
          onChange={e => {
            const newValues = [...this.state.values];
            newValues[index] = e.target.value;

            this.setState({ values: newValues });
          }}
          value={this.state.values[index]}
        />
      );
    });

    return (
      <Table.Row key={resultKey} height="auto">
        <Table.TextCell width="100%" flexShrink={0} flexGrow={2}>
          <Text fontSize={16} fontFamily={"mono"}>
            {resultKey}
          </Text>
        </Table.TextCell>
        <Table.TextCell flexShrink={0} flexGrow={3}>
          <Pane display="flex" flexDirection="column" alignItems="flex-start">
            {resultValueElements}
          </Pane>
        </Table.TextCell>
        <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0} textAlign="right">
          <Button height={20} appearance="primary" intent="warning" onClick={() => this.props.onUpdateString(resultKey, this.state.values)}>
            Save
          </Button>
        </Table.TextCell>
      </Table.Row>
    );
  }
}
