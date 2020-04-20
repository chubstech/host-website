import React from 'react';
import { TimeSeries } from "pondjs";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart
} from "react-timeseries-charts";


// Data
const data = require("../usd_vs_euro.json");
const points = data.widget[0].data.reverse();
const series1 = new TimeSeries({
  name: "USD_vs_EURO",
  columns: ["time", "value"],
  points
});

const series2 = new TimeSeries({
  name: "USD_vs_EURO",
  columns: ["time", "value"],
  points
});

class Baselines extends React.Component {
  state = {
    tracker: null,
    timerange: series1.range()
  };

  handleTrackerChanged = tracker => {
    this.setState({ tracker });
  };

  handleTimeRangeChange = timerange => {
    this.setState({ timerange });
  };

  render() {
      return (
          //<Resizable>
        /*
        <ChartContainer
            title="Euro price (USD)"
            titleStyle={{ fill: "#555", fontWeight: 500 }}
            timeRange={series.range()}
            format="%b '%y"
            timeAxisTickCount={5}
            width={3440}
        >
        <ChartRow height="800">
        <YAxis
            id="price"
            label="Price ($)"
            min={series.min()}
            max={series.max()}
            width="60"
            format="$,.2f"
        />
        <Charts>
              <LineChart axis="price" series={series} style={style} />
              <Baseline
                axis="price"
                style={baselineStyleLite}
                value={series.max()}
                label="Max"
                position="right"
              />
              <Baseline
                axis="price"
                style={baselineStyleLite}
                value={series.min()}
                label="Min"
                position="right"
              />
              <Baseline
                axis="price"
                style={baselineStyleExtraLite}
                value={series.avg() - series.stdev()}
              />
              <Baseline
                axis="price"
                style={baselineStyleExtraLite}
                value={series.avg() + series.stdev()}
              />
              <Baseline
                axis="price"
                style={baselineStyle}
                value={series.avg()}
                label="Avg"
                position="right"
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
*/
      //</Resizable>
      // <Resizable>
          <ChartContainer title="Average Hospital Noise Level Overall" format="%b '%y" timeRange={series1.timerange()} width={1200}>
         <ChartRow height="200">
           <YAxis id="axis1" label="dB Level" min={0} max={100} width="60" type="linear" />
           <Charts>
             <LineChart axis="axis1" series={series1} />
             <LineChart axis="axis2" series={series2} />
           </Charts>
             <YAxis id="axis2" label="dB Level" min={0} max={100} width="80" type="linear" />
         </ChartRow>
      </ChartContainer>
      // </Resizable>

    );
  }
}

export default Baselines;