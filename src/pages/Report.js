import React from 'react';
import ReportTable from '../components/ReportTable';
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
        <div class="no-print print-btn">
          <Button variant="info" size="lg" onClick={printPage}>Print report</Button>
        </div>

          <h1>Your Noise Report Summary</h1>
          {/*JS Date() declared January the 0th month*/}
          <p>Report for: { curr.getMonth()+1 }/{ curr.getDate() }/{ curr.getFullYear() }</p>

          <ReportChart/>
          <br></br>
          <br></br>
          <ReportTable/>
       </div>
    );
}

export default Report;
