import React, { Fragment, Component } from "react";

import PieChartAnalytics from "./PieChartAnalytics";
import {
  PieChart,
} from '@carbon/charts-react';
import "@carbon/charts/style.css";

const colors = [
  "#a05195",
  "#346888",
  "#5886a5",
  "#7aa6c2",
  "#9dc6e0",
  "#c1e7ff"
];

class EmailAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTemplateValue: [],
      data: {},
      showTemplateData: false,
      templateDistData: {}
    };
  }

  componentDidMount() {}

  getDummyData = async () => {
    return {};
  };

  handleSubmitTemplateVals = () => {
    this.getDummyData().then(res => {
      if (res && !res.error) {
        this.setState(
          {
            showTemplateData: true
          },
          () => {
            this.handleDataVals();
          }
        );
      }
    });
  };

  handleDataVals = () => {
    const { templateAnalytics } = this.props;
    const { response } = templateAnalytics || {};
    const { templateDistribution } = response || {};
    const keys = templateDistribution && Object.keys(templateDistribution);
    let delVal = 0;
    let bouncedVal = 0;
    const values =
      keys &&
      Array.isArray(keys) &&
      keys.length > 0 &&
      keys.map(res => {
        const { count } = templateDistribution && templateDistribution[res];
        if (
          templateDistribution &&
          templateDistribution[res] &&
          templateDistribution[res].Delivered
        ) {
          delVal +=
            templateDistribution &&
            templateDistribution[res] &&
            templateDistribution[res].Delivered;
        }
        if (
          templateDistribution &&
          templateDistribution[res] &&
          templateDistribution[res].Bounced
        ) {
          bouncedVal +=
            templateDistribution &&
            templateDistribution[res] &&
            templateDistribution[res].Bounced;
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

  changeState = () => {
    this.setState({
      name: 'changed',
      showTemplateData: true,
    });
  }

  render() {
    const { templateAnalytics } = this.props;
    const { response } = templateAnalytics || {};
    const { templateDistribution } = response || {};
    const keys = templateDistribution && Object.keys(templateDistribution);
    const {
      showTemplateData,
    } = this.state;
    console.log("RENDER EA", keys);
    return (
      <Fragment>
        <div>
          <button onClick={this.handleSubmitTemplateVals}>CHARTS!!!</button>
          <button onClick={this.changeState}>CHARTS2!!! {this.state.name}</button>
          <div className="bx--row">
            {
              showTemplateData && (
              <div>
                <h2>CHARTS SHOW</h2>
                <div className="bx--col-lg-6">
                  {/* <PieChartAnalytics data={oata} /> */}
                  {/* <PieChart
                    data={this.state.data}
                    width="100%"
                    height={200}
                    options={{
                      accessibility: false,
                      legendClickable: true,
                      containerResizable: false,
                    }}
                  /> */}
                </div>
                {keys &&
                  Array.isArray(keys) &&
                  keys.length > 0 &&
                  keys.map((res, id) => {
                    console.log("res", res, id);
                    const { Delivered = 0, Bounced = 0, count = 0 } =
                      (templateDistribution && templateDistribution[res]) || {};
                    let unCategorized = 0;
                    if (Number(Delivered) < Number(count)) {
                      unCategorized = Number(count) - Number(Delivered);
                    }
                    if (Number(Delivered) < Number(Bounced)) {
                      unCategorized = Number(count) - Number(Bounced);
                    }
                    const dataArr = [Delivered, Bounced, unCategorized];
                    const labels = ["Delivered", "Bounced", "Un-Categorized"];
                    const datasets = [
                      {
                        label: `ds-${res}-${id}`,
                        data: dataArr,
                        backgroundColors: colors
                      }
                    ];
                    const oata = {
                      labels,
                      datasets
                    };
                    console.log("data2222", oata);
                    return (
                      <div key={id} className="bx--col-lg-6">
                        {/* <PieChartAnalytics data={oata} /> */}
                        <PieChart
                          data={oata}
                          width="100%"
                          height={200}
                          options={{
                            accessibility: false,
                            legendClickable: true,
                            containerResizable: false,
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EmailAnalytics;
