import React from "react";
import { Pane, TextInput, Button } from "evergreen-ui";

export default class AddStrings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newStringKey: "",
      newStringValue: ""
    };
  }

  render() {
    return (
      <Pane display="flex" alignItems="center">
        <TextInput flex="1" name="new-string-key" placeholder="Key name" onChange={e => this.setState({ newStringKey: e.target.value })} />
        <TextInput flex="1" name="new-string-value" placeholder="Value" onChange={e => this.setState({ newStringValue: e.target.value })} />
        <Button onClick={() => this.props.onAddString(this.state.newStringKey, this.state.newStringValue)}>Save</Button>
      </Pane>
    );
  }
}
