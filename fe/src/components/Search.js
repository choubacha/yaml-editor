import React from "react";
import { Pane, Table, SearchInput, Text } from "evergreen-ui";

import Result from "./Result";

export default class Search extends React.PureComponent {
  render() {
    const { entitySlug, results, onUpdateString, onSearch } = this.props;

    const resultElements = Object.values(results).map(({ key: resultKey, value: resultValues }) => {
      return <Result key={resultKey} entitySlug={entitySlug} resultKey={resultKey} resultValues={resultValues} onUpdateString={onUpdateString} />;
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
          <Table flexDirection="column" width="90vw" marginTop="2rem">
            <Table.Head>
              <Table.TextHeaderCell width="100%" flexShrink={0} flexGrow={2}>
                <strong>Key Name</strong>
              </Table.TextHeaderCell>
              <Table.TextHeaderCell width="100%" flexShrink={0} flexGrow={3}>
                <strong>Content</strong>
              </Table.TextHeaderCell>
              <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0} />
            </Table.Head>
            <Table.Body>{resultElements}</Table.Body>
          </Table>
        )}
      </Pane>
    );
  }
}
