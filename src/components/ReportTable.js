import React from 'react';


class ReportTable extends React.Component {

    render() {
      var jsonfiles = require('../test-data-files/users.json');
      var table = [];
      jsonfiles.forEach((item, i) => {
        var json = require('../test-data-files/' + item + '.json')


        var row = [];
        var peak = 0;
        var avg = 0;
        var peakdict = {};

        json.forEach((item, i) => {
          avg += item.db_reading;
          if (item.db_reading > peak) {
            peak = item.db_reading;
          }

          if (peakdict[item.db_reading]) {
            var time = new Date(item.time_obs * 1000);
            peakdict[item.db_reading].push(time.toLocaleString());
          }
          else {
            var time = new Date(item.time_obs * 1000);
            peakdict[item.db_reading] = [time.toLocaleString()];
          }
        })
        row.push(item, Math.round(avg/json.length), peak, peakdict[peak]);
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
