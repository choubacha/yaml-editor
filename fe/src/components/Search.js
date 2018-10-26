import React from "react";
import { Pane, Table, SearchInput, Text } from "evergreen-ui";

import Result from "./Result";

import "../App.css";

export default class Search extends React.PureComponent {
  render() {
    const { entitySlug, results, onUpdateString, onSearch } = this.props;

    const resultElements = Object.values(results).map(({ key: resultKey, value: resultValue }) => {
      return <Result key={resultKey} entitySlug={entitySlug} resultKey={resultKey} resultValue={resultValue} onUpdateString={onUpdateString} />;
    });

    return (
      <Pane display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Pane position="relative">
          <SearchInput
            height={60}
            width={"90vw"}
            placeholder="Search for i18n Keys..."
            onChange={e => onSearch({ filter: { match: e.target.value } })}
          />
          <Text position="absolute" top={20} right={10} size={400} zIndex={2}>
            {results.length} matches
          </Text>
        </Pane>

        {!!results.length && (
          <Pane display="flex" flexDirection="column" width="90vw" marginTop="2rem">
            <Table>
              <Table.Head>
                <Table.TextHeaderCell width="100%" flexShrink={0} flexGrow={2}>
                  Key Name
                </Table.TextHeaderCell>
                <Table.TextHeaderCell width="100%" flexShrink={0} flexGrow={2}>
                  Last Activity
                </Table.TextHeaderCell>
                <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0} />
              </Table.Head>
              <Table.Body>{resultElements}</Table.Body>
            </Table>
          </Pane>
        )}
      </Pane>
    );
  }
}
