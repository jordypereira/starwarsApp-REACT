import * as React from 'react';
import PropTypes from "prop-types";

const Resident = (props) => (
  <li className="list-group-item">
      {props.resident}
  </li>
);

Resident.propTypes = {
  resident: PropTypes.string,
};

export default Resident;