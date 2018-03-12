import * as React from 'react';

const Resident = (props) => (
  <li className="list-group-item">
      {props.resident.name}
  </li>
);

export default Resident;