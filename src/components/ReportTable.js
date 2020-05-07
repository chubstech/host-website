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
        // var avg = values.reduce(function(a,b){return a+b;}, 0) / values.length;
        row.push(item, avg, peak);
        table.push(row);
      })
      const listItems = table.map((rows) =>
        <tr>
        <td>{rows[0]}</td>
        <td>{rows[1]} dB</td>
        <td>{rows[2]} dB</td>
        </tr>);

        return (
            <div>
                <h3>Daily Summary Table</h3>
                <table>
                  <tr>
                   <th id="table-header">Section Name</th>
                   <th id="table-header">Average dB</th>
                   <th id="table-header">Peak dB</th>
                  </tr>
                  {listItems}
                </table>
            </div>
        );
    }
}
  export default ReportTable;
