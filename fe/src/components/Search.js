import React from "react";
import { Combobox, Pane, Table, SearchInput, Text } from "evergreen-ui";

import Result from "./Result";

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    const { entities } = this.props;
    this.state = {
      selectedEngine: { label: entities[0].display, value: entities[0].slug },
      searchValue: ""
    };
  }

  handleSearch = e => {
    const { onSearch } = this.props;

    this.setState({ searchValue: e.target.value });
    onSearch({ filter: { match: e.target.value } });
  };

  handleDropDown = selected => {
    const { label: engineName } = selected;
    let searchValue = `${selected.label}.`;

    if (engineName === "root") {
      searchValue = "";
    }

    this.setState({ selectedEngine: selected, searchValue });

    if (this.textInput) {
      this.textInput.focus();
    }
  };

  render() {
    let { selectedEngine, searchValue } = this.state;
    const { entities, results, onUpdateString } = this.props;

    const resultElements = Object.values(results).map(({ key: resultKey, value: resultValues }) => {
      return <Result key={resultKey} resultKey={resultKey} resultValues={resultValues} onUpdateString={onUpdateString} />;
    });

    const entityLabels = entities.map(entity => {
      return { label: entity.display, value: entity.slug };
    });

    return (
      <Pane display="flex" flexDirection="column">
        <Combobox
          openOnFocus
          items={entityLabels}
          marginBottom="1rem"
          selectedItem={selectedEngine}
          itemToString={entityLabel => entityLabel.label}
          onChange={this.handleDropDown}
        />
        <Pane position="relative">
          <SearchInput
            innerRef={input => (this.textInput = input)}
            height={60}
            width={"90vw"}
            value={searchValue}
            placeholder="Search for i18n Keys..."
            onChange={this.handleSearch}
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
