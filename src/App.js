import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Ring from "ringjs";

import {
  TimeRange,
  TimeEvent,
  Pipeline as pipeline,
  Stream,
  EventOut,
  percentile
} from "pondjs";

import {
  ScatterChart,
  BarChart,
  Legend,
  styler
} from "react-timeseries-charts";


import { TimeSeries } from "pondjs";

import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Baseline,
  Resizable
} from "react-timeseries-charts";


// Data
const data = require("./usd_vs_euro.json");
const points = data.widget[0].data.reverse();
const series1 = new TimeSeries({
  name: "USD_vs_EURO",
  columns: ["time", "value"],
  points
});

const series = series1;

const series2 = new TimeSeries({
  name: "USD_vs_EURO",
  columns: ["time", "value"],
  points
});

const style = {
  value: {
    stroke: "#a02c2c",
    opacity: 0.2
  }
};

const baselineStyle = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.4,
    strokeDasharray: "none"
  },
  label: {
    fill: "steelblue"
  }
};

const baselineStyleLite = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.5
  },
  label: {
    fill: "steelblue"
  }
};

const baselineStyleExtraLite = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.2,
    strokeDasharray: "1,1"
  },
  label: {
    fill: "steelblue"
  }
};


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


/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 80;

class Realtime extends React.Component {
  static displayName = "AggregatorDemo";

  state = {
    // time: new Date(2015, 0, 1),
    time: new Date(),
    events: new Ring(200),
    percentile50Out: new Ring(100),
    percentile90Out: new Ring(100)
  };

  getNewEvent = t => {
    // const base = Math.sin(t.getTime() / 10000000) * 350 + 500;
    // return new TimeEvent(t, parseInt(base + Math.random() * 1000, 10));
    const base = Math.sin(t.getTime() / 10000000) * 1;
    return new TimeEvent(t, 100);
  };

  componentDidMount() {
    //
    // Setup our aggregation pipelines
    //

    this.stream = new Stream();

    pipeline()
      .from(this.stream)
      .windowBy("5m")
      .emitOn("discard")
      .aggregate({
        value: { value: percentile(90) }
      })
      .to(EventOut, event => {
        const events = this.state.percentile90Out;
        events.push(event);
        this.setState({ percentile90Out: events });
      });

    pipeline()
      .from(this.stream)
      .windowBy("5m")
      .emitOn("discard")
      .aggregate({
        value: { value: percentile(50) }
      })
      .to(EventOut, event => {
        const events = this.state.percentile50Out;
        events.push(event);
        this.setState({ percentile50Out: events });
      });

    //
    // Setup our interval to advance the time and generate raw events
    //

    const increment = minute;
    this.interval = setInterval(() => {
      const t = new Date(this.state.time.getTime() + increment);
      const event = this.getNewEvent(t);

      // Raw events
      const newEvents = this.state.events;
      newEvents.push(event);
      this.setState({ time: t, events: newEvents });

      // Let our aggregators process the event
      this.stream.addEvent(event);
    }, rate);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const latestTime = `${this.state.time}`;

    const fiveMinuteStyle = {
      value: {
        normal: { fill: "#619F3A", opacity: 0.2 },
        highlight: { fill: "619F3A", opacity: 0.5 },
        selected: { fill: "619F3A", opacity: 0.5 }
      }
    };

    const scatterStyle = {
      value: {
        normal: {
          fill: "steelblue",
          opacity: 0.5
        }
      }
    };

    //
    // Create a TimeSeries for our raw, 5min and hourly events
    //

    const eventSeries = new TimeSeries({
      name: "raw",
      events: this.state.events.toArray()
    });

    const perc50Series = new TimeSeries({
      name: "five minute perc50",
      events: this.state.percentile50Out.toArray()
    });

    const perc90Series = new TimeSeries({
      name: "five minute perc90",
      events: this.state.percentile90Out.toArray()
    });

    // Timerange for the chart axis
    // const initialBeginTime = new Date(2015, 0, 1);
    const initialBeginTime = new Date(); // Current Date

    const timeWindow = 3 * hours;

    let beginTime;
    const endTime = new Date(this.state.time.getTime() + minute);
    if (endTime.getTime() - timeWindow < initialBeginTime.getTime()) {
      beginTime = initialBeginTime;
    } else {
      beginTime = new Date(endTime.getTime() - timeWindow);
    }
    const timeRange = new TimeRange(beginTime, endTime);

    // Charts (after a certain amount of time, just show hourly rollup)
    const charts = (
      <Charts>
        <BarChart
          axis="y"
          series={perc90Series}
          style={fiveMinuteStyle}
          columns={["value"]}
        />
        <BarChart
          axis="y"
          series={perc50Series}
          style={fiveMinuteStyle}
          columns={["value"]}
        />
        <ScatterChart axis="y" series={eventSeries} style={scatterStyle} />
      </Charts>
    );

    const dateStyle = {
      fontSize: 12,
      color: "#AAA",
      borderWidth: 1,
      borderColor: "#F4F4F4"
    };

    const style = styler([
      { key: "perc50", color: "#C5DCB7", width: 1, dashed: true },
      { key: "perc90", color: "#DFECD7", width: 2 }
    ]);

    return (
      <div id='chart'>
        <div className="row">
          <div className="col-md-4">
            <Legend
              type="swatch"
              style={style}
              categories={[
                {
                  key: "perc50",
                  label: "Regular dB Levels",
                  style: { fill: "#C5DCB7" }
                },
                {
                  key: "perc90",
                  label: "Highest dB Levels",
                  style: { fill: "#DFECD7" }
                }
              ]}
            />
          </div>
          <div className="col-md-8">
            <span style={dateStyle}>{latestTime}</span>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
                    
              <ChartContainer title="Active Noise Level" timeRange={timeRange} width="1200">
                <ChartRow height="250">
                  <YAxis
                    id="y"
                    label="dB Levels"
                    min={0}
                    max={150} // This changes the y value of graph in terms of dB levels should be 0-200
                    width="100"
                    type="linear"
                  />
                  {charts}
                </ChartRow>
              </ChartContainer>
            
          </div>
        </div>
      </div>
    );
  }
}


//<Realtime /> <Baselines />

function App() {
  return (
    <div className="App">
          <header className="App-header">
              <Realtime />  
              <Baselines />
      </header>
    </div>
  );
}

export default App;