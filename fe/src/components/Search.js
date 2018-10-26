import React from "react";
import { Pane, Table, SearchInput, Autocomplete, TextInput, Button } from "evergreen-ui";

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
          <Table>
            <Table.Head>
              <Table.TextHeaderCell width="100%" flexShrink={0} flexGrow={2}>
                Key Name
              </Table.TextHeaderCell>
              <Table.TextHeaderCell width="100%" flexShrink={0} flexGrow={2}>
                Last Activity
              </Table.TextHeaderCell>
              <Table.TextHeaderCell flexBasis={200} flexShrink={0} flexGrow={0} />
            </Table.Head>
            <Table.Body>{resultElements}</Table.Body>
          </Table>
        </Pane>
      </Pane>
    );
  }
}
