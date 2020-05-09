import React from 'react';


class ReportTable extends React.Component {

    render() {
      var jsonfiles = require('../test-data-files/users.json');
      var table = [];
      jsonfiles.forEach((item, i) => {
        var currentFile = require('../test-data-files/' + item + '.json')
        var row = [];
        var values = currentFile.map(function(o) {return o.db_reading;});
        var peak = Math.max.apply(Math, values);
        var avg = Math.round(values.reduce(function(a,b){return a+b;}, 0) / values.length);

        var peaktimes = [];
        currentFile.forEach((item, i) => {
          if (item.db_reading == peak) {
            var time = new Date(item.time_obs * 1000);
            peaktimes.push(time.toLocaleTimeString(), ", ");
          }
        })
        row.push(item, avg, peak, peaktimes);
        table.push(row);
      })

      const listItems = table.map((rows) =>
        <tr key={rows[0]}>
        <td>{rows[0]}</td>
        <td>{rows[1]} dB</td>
        <td>{rows[2]} dB</td>
        {/*display nicer without hardcoding ","*/}
        <td>{rows[3]}</td>
        </tr>);

        return (
            <div>
                <h3>Daily Summary Table</h3>
                <table>
                <tbody>
                  <tr>
                   <th id="table-header">Section Name</th>
                   <th id="table-header">Average dB</th>
                   <th id="table-header">Peak dB</th>
                   <th id="table-header">Peak dB Time</th>
                  </tr>
                  {listItems}
                  </tbody>
                </table>
            </div>
        );
    }
}
  export default ReportTable;
