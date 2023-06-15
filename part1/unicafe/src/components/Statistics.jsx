import React from "react";

const Statistics = ({ value, text }) => {
  return (
    <tr>
     <td>{text}</td>
     <td>{value}</td> 
    </tr>
  );
};

export default Statistics;
