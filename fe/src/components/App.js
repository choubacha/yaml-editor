import React from "react";
import { Pane, Tablist, Tab, Dialog, Button } from "evergreen-ui";

import SearchContainer from "../containers/Search";
import AddStringsContainer from "../containers/AddStrings";

const YAM_FACTS = [
  "Yams are often mistakenly called sweet potatoes and vice versa, but these are actually two different vegetables. A true yam is the tuber of a tropical vine and it's not even distantly related to the sweet potato. Yams are a popular vegetable in Latin American and Caribbean markets, but the genuine article can be difficult to find in U.S. stores. This tuber can grow over seven feet in length.",

  "The yam's botanical name is dioscorea batatas. Depending on country and region, it may also be called a boniato, njam, nyami, djambi, yamswurzel, ñame or igname de chine.",

  "True yams are indigenous to Africa and Asia with most being grown in Africa, but there are over 150 varieties of yams available worldwide. Yams are mostly sold in chunks sealed in plastic wrap — if you can find them in the U.S. at all. They can reach up to 150 pounds, but they can also be as small as your average spud. True yams have rough, dark skin. Their flesh can range from white to a reddish color, but it's usually white. ",

  "Although you might find canned vegetables labeled as yams, these probably aren't true yams. Even the 'yams' found in fresh produce sections of grocery stores are rarely real yams. They're soft sweet potatoes, which are different from firm sweet potatoes. U.S. grocers began selling these homegrown soft potatoes as yams hundreds of years ago in an effort to differentiate them from the firm sweet potatoes people had been buying for years. The FDA has never seen fit to get involved in this case of mistaken identity and sort out the discrepancy. ",

  "Yams tended to be drier than sweet potatoes and they're starchier. They're often served boiled and sprinkled with palm oil in their native Africa, but they can also be roasted, fried, grilled or baked. Unlike sweet potatoes, yams are toxic if they're eaten raw, but they're perfectly safe when they're cooked. True yams can generally be substituted in any sweet potato recipe.",

  "Store fresh uncooked yams in a cool, dark, dry area for up to two weeks. Do not refrigerate them. Cooked yams can be kept refrigerated for two to three days. Pack them in an airtight container if you want to freeze them, leaving about a half inch of headroom. You can safely freeze yams for 10 to 12 months at 0 F.",

  "Compared to sweet potatoes, yams are usually longer – sometimes as long as several feet – and not as sweet, having a rough, dark orange or brown surface that looks like tree bark. They're usually harvested after a year of vine growth, dried for several hours in a barn ventilated for that purpose, after which they can be stored without refrigeration for several weeks."
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { yamDialogShown: false, selectedIndex: 0, tabs: ["Find Strings", "Add Strings"] };
  }

  render() {
    const { entities } = this.props;

    return (
      <Pane width="90vw" marginLeft="auto" marginRight="auto" marginTop="2rem" marginBottom="2rem">
        <Pane display="flex" justifyContent="space-between">
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
          <Pane>
            <Dialog
              isShown={this.state.yamDialogShown}
              hasCancel={false}
              onCloseComplete={() => this.setState({ yamDialogShown: false })}
              hasHeader={false}
            >
              {YAM_FACTS[Math.floor(Math.random() * YAM_FACTS.length)]}
            </Dialog>

            <Button onClick={() => this.setState({ yamDialogShown: true })}>YAM FACTS</Button>
          </Pane>
        </Pane>

        <Pane flex="1">
          {this.state.tabs.map((tab, index) => (
            <Pane
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={tab}
              aria-hidden={index !== this.state.selectedIndex}
              display={index === this.state.selectedIndex ? "block" : "none"}
            >
              {tab === "Find Strings" && <SearchContainer entities={entities} />}
              {tab === "Add Strings" && <AddStringsContainer entities={entities} />}
            </Pane>
          ))}
        </Pane>
      </Pane>
    );
  }
}
