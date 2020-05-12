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
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    var pastDay =  Math.round(Date.now() / 1000) - 86400;

    makeAPIRequestUsers()
      .then((users) => {
        var table = [];
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

                if (peaktimes[item.db_reading]) {
                  var time = new Date(item.time_obs * 1000);
                  peaktimes[item.db_reading].push(time.toLocaleString());
                }
                else {
                  var time = new Date(item.time_obs * 1000);
                  peaktimes[item.db_reading] = [time.toLocaleString()];
                }
              })
              table.push({"user_id": e.user_id, "avg": Math.round(avg/data.length), "peak": peak, "times": peaktimes[peak]});
            })
        })
        console.log(table);
        this.setState({
          isLoaded: true,
          items: table
        });
      })
  }

    render() {
      // TODO: display table onto page
      const { error, isLoaded, items } = this.state;
      if(error) {
        return <div> Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div> Loading...</div>;
      } else {
        return (
          <ul>
            {items.map(item => (
              <li>
                {item.user_id} {item.peak}
              </li>
            ))}
          </ul>
        );
    }
  }
}
export default ReportTable;
