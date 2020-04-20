import React from 'react';

const Report = () => {
   var curr = new Date();
    return (
       <div>
          <h1>Your Noise Report Summary</h1>
          <p>Report for: { curr.getMonth() }/{ curr.getDate() }/{ curr.getFullYear() }</p>
       </div>
    );
}

export default Report;
