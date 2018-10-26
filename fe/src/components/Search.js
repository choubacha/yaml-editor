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
        <Autocomplete title="i18n Keys" items={foundKeys}>
          {({ key, getInputProps, getRef, inputValue, openMenu }) => (
            <Pane key={key} innerRef={getRef} display="flex">
              <TextInput
                height={60}
                width={"90vw"}
                placeholder="Search for i18n Keys..."
                value={inputValue}
                onFocus={openMenu}
                {...getInputProps()}
              />
            </Pane>
          )}
        </Autocomplete>

        <Pane display="flex" flexDirection="column" width="90vw" marginTop="2rem">
          {resultElements}
        </Pane>
      </Pane>
    );
  }
}
