import * as React from 'react';
import PropTypes from 'prop-types';

const PlanetPropertyItem = (props) => (
        <button className="dropdown-item" onClick={(e) => props.onAdd(e)} value={props.name}>
            {props.name}
        </button>
);

PlanetPropertyItem.propTypes = {
  name: PropTypes.string,
  onAdd: PropTypes.func,
};

export default PlanetPropertyItem;
