import React from "react";
import { Pane, SearchInput, Autocomplete, TextInput, Button } from "evergreen-ui";

export default class Result extends React.PureComponent {
  render() {
    const { results } = this.props;

    const resultComponents = results.map(result => {
      return (
        <Pane key={result.key} display="flex" justifyContent="space-between">
          <Pane>{result.key}</Pane>
          <Pane>{result.value}</Pane>
        </Pane>
      );
    });

    return <Pane>{resultComponents}</Pane>;
  }
}
