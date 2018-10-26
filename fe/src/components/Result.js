import React from "react";
import { Card, Pane, TextInput, Button } from "evergreen-ui";

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
      <Card
        marginBottom="0.5rem"
        paddingTop="0.8rem"
        paddingBottom="0.8rem"
        paddingLeft="1rem"
        paddingRight="1rem"
        key={resultKey}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Pane flex="3">{resultKey}</Pane>
        <TextInput flex="3" onChange={e => this.setState({ value: e.target.value })} value={this.state.value} />
        <Pane flex="1" textAlign="right">
          <Button height={24} appearance="success" onClick={() => this.props.onUpdateString(resultKey, this.state.value)}>
            Update
          </Button>
          <Button height={24} marginLeft={5} appearance="minimal" intent="danger" onClick={e => this.setState({ value: this.state.original })}>
            Cancel
          </Button>
        </Pane>
      </Card>
    );
  }
}
