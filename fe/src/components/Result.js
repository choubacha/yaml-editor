import React from "react";
import { Card, Pane, TextInput, Button } from "evergreen-ui";

export default class Result extends React.PureComponent {
  constructor(props) {
    super(props);

    const { resultValue } = this.props;

    this.state = {
      value: resultValue
    };
  }
  render() {
    const { resultKey } = this.props;

    return (
      <Card
        elevation={1}
        marginTop="1rem"
        marginBottom="1rem"
        paddingTop="0.8rem"
        paddingBottom="0.8rem"
        paddingLeft="1rem"
        paddingRight="1rem"
        key={resultKey}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flex="1"
      >
        <Pane flex="1">{resultKey}</Pane>
        <TextInput flex="1" onChange={e => this.setState({ value: e.target.value })} value={this.state.value} />
        <Button onClick={() => this.props.onUpdateString(resultKey, this.state.value)}>Save</Button>
      </Card>
    );
  }
}
