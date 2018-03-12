import * as React from 'react';
import PropTypes from 'prop-types';
import {capitalizeFirstLetter} from "../../functions";

const PlanetProperty = (props) => (
        <li className="list-group-item d-flex w-100 justify-content-between">
            {capitalizeFirstLetter(props.name.replace('_', ' '))}: {props.value}
            <button className="btn btn-danger btn-sm" onClick={(e) => props.onDelete(e)} value={props.name}>Delete</button>
        </li>
);

PlanetProperty.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onDelete: PropTypes.func,
};

export default PlanetProperty;
