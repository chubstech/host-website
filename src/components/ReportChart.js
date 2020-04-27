import React from 'react';
import { TimeSeries } from "pondjs";
import _ from "underscore";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    Baseline,
    Resizable
  } from "react-timeseries-charts";
  
 import styler from './../js/styler' 
import Legend from './../Legend'
import LineChart from './LineChart'



const test_data = require('./../test_data.json');


function buildPoints() {

    let result = [];

    for(let i = 0; i < test_data.length ; i++) {

        var time = new Date( test_data[i].time_obs *100 );
        result.push( [time,  test_data[i].db_reading, (test_data[i].db_reading -10) ] );

    }

    return result;


}

const noiseSeries = new TimeSeries({
    name: "Noise",
    columns: ["time", "debug1"],  //columns: ["time", "debug1", "debug2"],
    points: buildPoints()
});

const style = styler([
    { key: "debug1", color: "steelblue", width: 3 },
    // { key: "debug2", color: "#F68B24", width: 2 }
]);


class ReportChart extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tracker: null,
            timerange: noiseSeries.range(),
            x: null,
            y: null
        };

    }
    handleTrackerChanged = tracker => {
        if (!tracker) {
            this.setState({ tracker, x: null, y: null });
        } else {
            this.setState({ tracker });
        }
    };

    handleTimeRangeChange = timerange => {
        this.setState({ timerange });
    };

    handleMouseMove = (x, y) => {
        this.setState({ x, y });
    };

    render() {
        const range = this.state.timerange;


        return (
            <div>

                <p><strong>*Scroll up to Zoom in chart</strong></p>

                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer
                                timeRange={range}
                                timeAxisStyle={{
                                    ticks: {
                                        stroke: "black",
                                        opacity: 0.25,
                                        "stroke-dasharray": "1,1"
                                        // Note: this isn't in camel case because this is
                                        // passed into d3's style
                                    },
                                    values: {
                                        fill: "black",
                                        "font-size": 12
                                    }
                                }}
                                showGrid={true}
                                paddingRight={125}
                                maxTime={noiseSeries.range().end()}
                                minTime={noiseSeries.range().begin()}
                                timeAxisAngledLabels={true}
                                timeAxisHeight={65}
                                onTrackerChanged={this.handleTrackerChanged}
                                onBackgroundClick={() => this.setState({ selection: null })}
                                enablePanZoom={true}
                                onTimeRangeChanged={this.handleTimeRangeChange}
                                onMouseMove={(x, y) => this.handleMouseMove(x, y)}
                                minDuration={1000 * 60 * 60 * 24 * 30}
                            >
                                <ChartRow height="400">
                                    <YAxis
                                        id="y"
                                        label="(dB) Noise Level"
                                        min={0}
                                        max={100}
                                        style={{
                                            ticks: {
                                                stroke: "#AAA",
                                                opacity: 0.25,
                                                "stroke-dasharray": "1,1"
                                                // Note: this isn't in camel case because this is
                                                // passed into d3's style
                                            }
       
                                        }}
                                        showGrid
                                        hideAxisLine
                                        width="50"
                                        type="linear"
                                        format=""
                                    />
                                    <Charts>
                                        <LineChart
                                            axis="y"
                                            breakLine={false}
                                            series={noiseSeries}
                                            columns={["debug1"]} //columns={["debug1", "debug2"]}
                                            style={style}
                                            interpolation="curveBasis"
                                            highlight={this.state.highlight}
                                            onHighlightChange={highlight =>
                                                this.setState({ highlight })
                                            }
                                            selection={this.state.selection}
                                            onSelectionChange={selection =>
                                                this.setState({ selection })
                                            }
                                        />
                                        <Baseline
                                            axis="y"
                                            value={70}
                                            label="Noise (dB) Level Cap"
                                            position="right"

                                        />
                                    </Charts>
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>
                            <Legend
                                type="line"
                                align="right"
                                style={style}
                                highlight={this.state.highlight}
                                onHighlightChange={highlight => this.setState({ highlight })}
                                selection={this.state.selection}
                                onSelectionChange={selection => this.setState({ selection })}
                                categories={[
                                    { key: "debug1", label: "User1 (Debug)"},
                                    // { key: "debug2", label: "User2"}
                                ]}
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}





  
  export default ReportChart;