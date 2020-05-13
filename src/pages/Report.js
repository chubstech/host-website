import React from 'react';
import ReportTable from '../components/ReportTableAPI';
import ReportChart from '../components/ReportChart';
import Button from 'react-bootstrap/Button';


const Report = () => {
   var curr = new Date();
   function printPage(e) {
     e.preventDefault();
     window.print();
   }
    return (
       <div>
        <div className="no-print print-btn">
          <Button variant="info" size="lg" onClick={printPage}>Print report</Button>
        </div>

          <h1>Your Noise Report Summary</h1>
          <p>Generated on <b>{ curr.toLocaleDateString() }</b></p>

          <ReportChart/>
          <br></br>
          <br></br>
          <ReportTable/>
       </div>
    );
}

export default Report;
