import React from 'react';
import ReportTable from '../components/ReportTable';
import ReportChart from '../components/ReportChart';


const Report = () => {
   var curr = new Date();
    return (


       <div id='content'>
          <h1>Your Noise Report Summary</h1>


          <p>Report for: { curr.getMonth() }/{ curr.getDate() }/{ curr.getFullYear() }</p>


         <ReportChart/>


          <ReportTable/>
       </div>
    );
}

export default Report;
