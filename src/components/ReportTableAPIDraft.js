import React from 'react';

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
    let test = [];
    fetch('https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/users')
      .then(res => res.json())
      .then(users => {
        users.map(function(e) {
          fetch("https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/" + e.user_id)
            .then(res => res.json())
            .then((json) => {
              console.log("test")
              var peak = 0;
              var avg = 0;
              json.forEach((item, i) => {
                avg += item.db_reading;
                if (item.db_reading > peak) {
                  peak = item.db_reading;
                }
              })
              test.push({"user_id": e.user_id, "avg": Math.round(avg/json.length), "peak": peak});
            })
        })
        this.setState({
          isLoaded: true,
          items: test
        });
      })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if(error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div> Loading...</div>;
    } else {
      return(
        <ul>
          {items.map(item => (
            <li key={item.user_id}>
              {item.user_id} {item.avg}
            </li>
          ))}
        </ul>
      );
    }
  }

}

  export default ReportTable;
