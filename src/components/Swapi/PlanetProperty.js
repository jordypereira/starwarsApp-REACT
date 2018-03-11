import * as React from 'react';
import PropTypes from 'prop-types';

const PlanetProperty = (props) => (
  <li className="list-group-item">{props.name}: {props.value}</li>  
);

PlanetProperty.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
};

export default PlanetProperty;
