import React from 'react';
import ReportTable from '../components/ReportTable';
import ReportChart from '../components/ReportChart';
import Button from 'react-bootstrap/Button';

const Report = () => {
   var curr = new Date();


   var curr = new Date();
   function printPage(e) {
     e.preventDefault();
     window.print();
   }


    return (


       <div id='content'>

          <div class="no-print">
            <Button variant="info" className="print-btn" onClick={printPage}>Print report</Button>
          </div>

          <h1>Your Noise Report Summary: { curr.getMonth() }/{ curr.getDate() }/{ curr.getFullYear() }</h1>

         <div style={{border: '1px solid black', padding: 50, margin: 30}}>
            <ReportChart/>
         </div>

         <div style={{padding: 20, margin: 30}}>
          <ReportTable/>
         </div>
       </div>
    );
}

export default Report;
