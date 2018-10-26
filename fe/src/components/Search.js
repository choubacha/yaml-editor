import React from "react";
import { Pane, SearchInput, Autocomplete, TextInput, Button } from "evergreen-ui";

import Results from "./Results";

import "../App.css";

export default class Search extends React.PureComponent {
  render() {
    const results = this.props.results;
    console.log(results);
    const foundKeys = results.map(result => result.key);

    return (
      <Pane display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="800px" marginLeft="auto" marginRight="auto">
        <Autocomplete title="i18n Keys" onChange={changedItem => console.log(changedItem)} items={foundKeys}>
          {({ key, getInputProps, getRef, inputValue, openMenu }) => (
            <Pane key={key} innerRef={getRef} display="flex">
              <TextInput placeholder="Search for i18n Keys..." value={inputValue} onFocus={openMenu} {...getInputProps()} />
            </Pane>
          )}
        </Autocomplete>

        <Results results={results} />
      </Pane>
    );
  }
}
