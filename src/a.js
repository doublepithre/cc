import React from "react";
import ReactDOM from "react-dom";

import { defaultColors } from "@carbon/charts";
import { BarChart, PieChart } from "@carbon/charts-react";
import "@carbon/charts/style.css";
const colors = [
  "#a05195",
  "#346888",
  "#5886a5",
  "#7aa6c2",
  "#9dc6e0",
  "#c1e7ff"
];
const stackedBarOptions = {
  accessibility: false,
  scales: {
    x: {
      title: "2018 Annual Sales Figures"
    },
    y: {
      formatter: axisValue => {
        return `${axisValue / 1000}k`;
      },
      yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
      stacked: true
    }
  },
  legendClickable: true,
  containerResizable: true
};

class App extends React.Component {
  state = {
    data: {
      labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColors: [defaultColors[0]],
          data: [65000, 29123, 35213, 51213, 16932]
        },
        {
          label: "Dataset 2",
          backgroundColors: [defaultColors[1]],
          data: [32432, 21312, 56456, 21312, 34234]
        },
        {
          label: "Dataset 3",
          backgroundColors: [defaultColors[2]],
          data: [12312, 23232, 34232, 12312, 34234]
        }
      ]
    }
  };

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

  updateData = () => {
    const data = this.state.data;
    data.datasets[0].data[0] = Math.random() * 65000;
    data.datasets[0].data[3] = Math.random() * 51213;

    this.setState({
      ...this.state,
      data
    });
  };

  render() {
    console.log("BAR CHART", this.barChart);
    const data = {
      labels: ["Others", "Information Technology", "Marketing"],
      datasets: [
        {
          label: "Dataset1",
          data: [16, 13, 1],
          backgroundColors: [
            "#a05195",
            "#346888",
            "#5886a5",
            "#7aa6c2",
            "#9dc6e0",
            "#c1e7ff"
          ]
        }
      ]
    };

    return (
      <div className="App">
        <PieChart
          data={this.state.data}
          height={400}
          options={{
            accessibility: false,
            legendClickable: true,
            containerResizable: false
          }}
        />

        <button onClick={this.handleUpload}>Test update</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
