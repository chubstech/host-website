import React from 'react';


class ReportTable extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          data: [
            {
                "time_obs": 1586030214,
                "user_id": "Debug",
                "db_reading": 43
            },
            {
                "time_obs": 1586030214,
                "user_id": "Debug",
                "db_reading": 67
            },
            {
                "time_obs": 1586030215,
                "user_id": "Debug",
                "db_reading": 33
            },
            {
                "time_obs": 1586030215,
                "user_id": "Debug",
                "db_reading": 63
            },
            {
                "time_obs": 1586030219,
                "user_id": "Debug",
                "db_reading": 64
            },
            {
                "time_obs": 1586030219,
                "user_id": "Debug",
                "db_reading": 61
            },
            {
                "time_obs": 1586030219,
                "user_id": "Debug",
                "db_reading": 53
            },
            {
                "time_obs": 1586030219,
                "user_id": "Debug",
                "db_reading": 58
            },
            {
                "time_obs": 1586030219,
                "user_id": "Debug",
                "db_reading": 62
            },
            {
                "time_obs": 1586030219,
                "user_id": "Debug",
                "db_reading": 53
            },
            {
                "time_obs": 1586030219,
                "user_id": "Debug",
                "db_reading": 46
            },
            {
                "time_obs": 1586030219,
                "user_id": "Debug",
                "db_reading": 50
            },
            {
                "time_obs": 1586030221,
                "user_id": "Debug",
                "db_reading": 45
            }
        ]
        

        };


    }


    getTime( obs_time ) {

        let date = new Date(0);
        var myDate = new Date( obs_time *100);
        return myDate;
        // while( count < data_array.length ) {

        //     let db_level = data_array[count].db_reading;
        //     let timeobs = data_array[count].time_obs;
        //     let date = new Date(0);


        //     // Date from the api data
        //     var myDate = new Date( timeobs *100);

        //     console.log('myDate', myDate);
        //     console.log('COUNT', count);
        //     console.log('Date()', t);

        //     count++;

        //     return new TimeEvent( myDate, db_level);
        // }
        
    }



    render() {
        return (

            <div>


                <h3>Daily Summary Table</h3>

                <table>

                    <thead id='table-header'>
                        <tr>
                            <th>ID Number</th>
                            <th>Avg dB</th>
                            <th>Peak dB</th>
                        </tr>
                    </thead>

                    <tr>
                        <th>1</th>
                        <th>55 dB</th>
                        <th>{this.state.data[0].db_reading} dB</th>
                        {/* {this.state.data.map( item => 
                            <th> { item.db_reading } </th>
                            )} */}
                    </tr>

                    <tr>
                        <th>2</th>
                        <th>52 dB</th>
                        <th>72 dB</th>
                    </tr>

                    <tr>
                        <th>3</th>
                        <th>68 dB</th>
                        <th>87 dB</th>
                    </tr>

                    <tr>
                        <th>4</th>
                        <th>70 dB</th>
                        <th>73 dB</th>
                    </tr>

                    <tr>
                        <th>5</th>
                        <th>60 dB</th>
                        <th>69 dB</th>
                    </tr>


                </table>


            </div>


        );
    }




}




  
  export default ReportTable;