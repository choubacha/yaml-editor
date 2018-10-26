import React from "react";
import { Pane, SearchInput, Autocomplete, TextInput, Button } from "evergreen-ui";

import Result from "./Result";

import "../App.css";

export default class Search extends React.PureComponent {
  render() {
    const { results, onUpdateString } = this.props;
    const foundKeys = Object.keys(results);

    const resultElements = Object.values(results).map(({ key: resultKey, value: resultValue }) => {
      return <Result key={resultKey} resultKey={resultKey} resultValue={resultValue} onUpdateString={onUpdateString} />;
    });

    return (
      <Pane display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Autocomplete title="i18n Keys" items={foundKeys} width="100%">
          {({ key, getInputProps, getRef, inputValue, openMenu }) => (
            <Pane key={key} innerRef={getRef} display="flex">
              <TextInput placeholder="Search for i18n Keys..." value={inputValue} onFocus={openMenu} {...getInputProps()} />
            </Pane>
          )}
        </Autocomplete>

        <Pane display="flex" flexDirection="column" width="100%">
          {resultElements}
        </Pane>
      </Pane>
    );
  }
}
