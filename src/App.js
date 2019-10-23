import React from "react";
import EmailAnalytics from "./EmailAnalytics";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("CON APP", props);
    this.state = {};
  }

  componentDidMount() {
    console.log("CDM APP");
  }

  render() {
    console.log("RENDER APP", this.state.data);
    const data = {
      response: {
        templateDistribution: {
          shortlist: {
            Delivered: 20,
            Bounced: 3,
            count: 23
          },
          reject: {
            Delivered: 12,
            Bounced: 8,
            count: 20
          }
        }
      }
    };
    return (
      <div className="App">
        <EmailAnalytics templateAnalytics={data} />
      </div>
    );
  }
}

export default App;
