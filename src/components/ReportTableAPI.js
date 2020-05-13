import React from 'react';

function makeAPIRequest(userType) {
    var baseAPIURL = 'https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/';
    baseAPIURL = baseAPIURL + userType
    return fetch(baseAPIURL)
        .then((response) => {
            return response.json();
        })
        .then(json => {
            return json;
        });
}

function makeAPIRequestUsers() {
    return fetch('https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/users')
        .then((response) => {
            return response.json();
        })
        .then(json => {
            return json;
        });
}

class ReportTable extends React.Component {

  componentDidMount() {
    var pastDay =  Math.round(Date.now() / 1000) - 86400;
    // var pastDay =  1588974396 - 86400; //esp32 stopped sending data 5/8. uncomment to show something on table
    makeAPIRequestUsers()
      .then((users) => {
        var jsonUsers = JSON.stringify(users);
        jsonUsers = JSON.parse(jsonUsers);
        jsonUsers.map(function(e) {
          makeAPIRequest(e.user_id)
            .then((rawdata) => {
              var data = JSON.stringify(rawdata);
              data = JSON.parse(data);
              var filteredJson = data.filter(function (e) {
                  return e.time_obs >= pastDay;
                  }
              );

              var peak = 0;
              var avg = 0;
              var peaktimes = {};

              filteredJson.forEach((item, i) => {
                avg += item.db_reading;
                if (item.db_reading > peak) {
                  peak = item.db_reading;
                }

                var time = new Date(item.time_obs * 1000);
                if (peaktimes[item.db_reading]) {
                  peaktimes[item.db_reading].push(time.toLocaleString());
                }
                else {
                  peaktimes[item.db_reading] = [time.toLocaleString()];
                }
              })
              var d1 = document.getElementById('table');
              d1.insertAdjacentHTML('beforeend', '<tr><td>'+e.user_id+'</td><td>'+ Math.round(avg/data.length)+'</td><td>'+ peak +'</td><td>'+ peaktimes[peak] +'</tr>');
            })
        })
      })
  }

    render() {
        return (
          <div>
              <h3>Daily Summary Table</h3>
              <table>
              <tbody id="table">
                <tr>
                 <th id="table-header">Section Name</th>
                 <th id="table-header">Average dB</th>
                 <th id="table-header">Peak dB</th>
                 <th id="table-header">Peak dB Time</th>
                </tr>
                </tbody>
              </table>
          </div>
        );
  }
}
export default ReportTable;
