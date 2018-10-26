import React from "react";
import { Pane, Tablist, Tab } from "evergreen-ui";

import SearchContainer from "../containers/Search";
import AddStringsContainer from "../containers/AddStrings";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0, tabs: ["Find Strings", "Add Strings"] };
  }

  render() {
    return (
      <Pane width="90vw" marginLeft="auto" marginRight="auto" marginTop="2rem" marginBottom="2rem">
        <Pane height={120}>
          <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            {this.state.tabs.map((tab, index) => (
              <Tab
                key={tab}
                id={tab}
                onSelect={() => this.setState({ selectedIndex: index })}
                isSelected={index === this.state.selectedIndex}
                aria-controls={`panel-${tab}`}
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
          <Pane padding={16} flex="1">
            {this.state.tabs.map((tab, index) => (
              <Pane
                key={tab}
                id={`panel-${tab}`}
                role="tabpanel"
                aria-labelledby={tab}
                aria-hidden={index !== this.state.selectedIndex}
                display={index === this.state.selectedIndex ? "block" : "none"}
              >
                {tab === "Find Strings" && <SearchContainer />}
                {tab === "Add Strings" && <AddStringsContainer />}
              </Pane>
            ))}
          </Pane>
        </Pane>
      </Pane>
    );
  }
}
