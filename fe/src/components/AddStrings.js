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
      <Pane display="flex" justifyContent="space-between">
        <TextInput name="new-string-key" placeholder="Search for i18n Keys..." onChange={e => this.setState({ newStringKey: e.target.value })} />
        <TextInput name="new-string-value" placeholder="Search for i18n Keys..." onChange={e => this.setState({ newStringValue: e.target.value })} />
        <Button onClick={() => this.props.onAddString(this.state.newStringKey, this.state.newStringValue)}>Save</Button>
      </Pane>
    );
  }
}
