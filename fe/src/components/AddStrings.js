import React from "react";
import { Table, Pane, TextInput, Button } from "evergreen-ui";

export default class AddStrings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [{ key: "", values: [], entitySlug: "identity" }]
    };
  }

  onAddRow = () => {
    this.setState({ rows: [...this.state.rows, { key: "", values: [], entitySlug: "identity" }] });
  };

  updateRow = (index, data) => {
    const newState = this.state.rows;

    newState[index] = { ...newState[index], ...data };

    this.setState({ rows: newState });
  };

  render() {
    const { rows } = this.state;

    const rowElements = rows.map((_row, index) => {
      return (
        <Table.Row className="table-row" key={index} height="auto" paddingTop="0.5rem" paddingBottom="0.5rem">
          <Table.TextCell width="100%" flexShrink={0} flexGrow={1}>
            <TextInput
              fontFamily="mono"
              flex="1"
              name="new-string-key"
              placeholder="Key name"
              onChange={e => this.updateRow(index, { key: e.target.value })}
            />
          </Table.TextCell>
          <Table.TextCell width="100%" flexShrink={0} flexGrow={3}>
            <TextInput
              width="100%"
              flex="1"
              name="new-string-value"
              placeholder="Value"
              onChange={e => this.updateRow(index, { values: [e.target.value] })}
            />
          </Table.TextCell>
          <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0} textAlign="right">
            <Button className="save-button" height={20} appearance="primary" onClick={() => this.props.onAddString(rows[index])}>
              Save
            </Button>
          </Table.TextCell>
        </Table.Row>
      );
    });
    return (
      <Pane>
        <Button onClick={() => this.onAddRow()}>Add Row</Button>
        <Table flexDirection="column" width="90vw" marginTop="1rem">
          <Table.Head>
            <Table.TextHeaderCell width="100%" flexShrink={0} flexGrow={1}>
              <strong>Key Name</strong>
            </Table.TextHeaderCell>
            <Table.TextHeaderCell width="100%" flexShrink={0} flexGrow={3}>
              <strong>Content</strong>
            </Table.TextHeaderCell>
            <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0} />
          </Table.Head>
          <Table.Body>{rowElements}</Table.Body>
        </Table>
      </Pane>
    );
  }
}
