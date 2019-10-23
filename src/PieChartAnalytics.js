import React from 'react';
import {
  PieChart,
} from '@carbon/charts-react';
import "@carbon/charts/style.css";
const isEqual = require('lodash.isequal');
// const PieChartAnalytics = (props) => {
//   const {
//     data,
//   } = props;
//   console.log('RENDER PCA', data);
//   return (
//     <PieChart
//       data={data}
//       width="100%"
//       height={200}
//       options={{
//         accessibility: false,
//         legendClickable: true,
//         containerResizable: false,
//       }}
//     />
//   );
// };

class PieChartAnalytics  extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(prevProps) {
    if(isEqual(prevProps.data, this.props.data)) {
      console.log(prevProps.data);
      console.log(this.props.data);
      return true;
    } else {
      console.log('SAME PROPS');
      return false;
    }
  }

  render() {
    const {
      data,
    } = this.props;
    console.log('RENDER PCA', data);
    return (
      <PieChart
        data={data}
        width="100%"
        height={200}
        options={{
          accessibility: false,
          legendClickable: true,
          containerResizable: false,
        }}
      />
    );
  }
};

export default PieChartAnalytics;