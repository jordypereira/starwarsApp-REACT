import * as React from 'react';
import PropTypes from 'prop-types';

const PlanetProperty = (props) => (
        <li className="list-group-item d-flex w-100 justify-content-between">
            {props.name}: {props.value}
            <button className="btn btn-danger btn-sm" onClick={(e) => props.onDelete(e)} value={props.name}>Delete</button>
        </li>
);

PlanetProperty.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
};

export default PlanetProperty;
