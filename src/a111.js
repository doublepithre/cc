import React from "react";
import { PieChart } from "@carbon/charts-react";
import "@carbon/charts/style.css";
const colors = [
  "#a05195",
  "#346888",
  "#5886a5",
  "#7aa6c2",
  "#9dc6e0",
  "#c1e7ff"
];

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('CON', props);
    this.state = {};
  }

  handleUpload = () => {
    const details = {
      shortlist: { count: 1, Delivered: 1 },
      candidatehired: { count: 1, Bounced: 1 }
    };
    const keys = details && Object.keys(details);
    let delVal = 0;
    let bouncedVal = 0;
    const values =
      keys &&
      Array.isArray(keys) &&
      keys.length > 0 &&
      keys.map(res => {
        const { count } = details && details[res];
        if (details && details[res] && details[res].Delivered) {
          delVal += details && details[res] && details[res].Delivered;
        }
        if (details && details[res] && details[res].Bounced) {
          bouncedVal += details && details[res] && details[res].Bounced;
        }
        const datasets = {
          del: delVal,
          boun: bouncedVal,
          count
        };
        return datasets;
      });
    console.log("values", values);
    this.handleStatusDistribution(values);
  };

  handleStatusDistribution = values => {
    const length = values && Array.isArray(values) && values.length - 1;
    const dataArr =
      values && Array.isArray(values) && values.length > 0 && values[length];
    let finalDataSets = [];
    if (dataArr && (dataArr.del !== 0 || dataArr.boun !== 0)) {
      finalDataSets = [dataArr.del, dataArr.boun];
    }
    const labels = ["Delivered", "Bounced"];
    let datasets = [];
    if (
      finalDataSets &&
      Array.isArray(finalDataSets) &&
      finalDataSets.length > 0
    ) {
      datasets = [
        {
          label: "Dataset1",
          data: finalDataSets,
          backgroundColors: colors
        }
      ];
    }
    const pieData = {
      labels,
      datasets
    };
    this.setState({
      data: pieData
    });
  };

  componentDidMount() {
    console.log('CDM');
    this.handleUpload();
  }

  render() {
    console.log("RENDER");
  
    return (
      <div className="App" style={{padding: 40}}>
        <PieChart
          data={this.state.data}
          width={800}
          height={400}
          options={{
            accessibility: false,
            legendClickable: true,
            containerResizable: false
          }}
        />
        <hr />
        <PieChart
          data={this.state.data}
          width={600}
          height={400}
          options={{
            accessibility: false,
            legendClickable: true,
            containerResizable: false
          }}
        />
      </div>
    );
  }
}

export default App;

