import * as React from 'react';
import PropTypes from 'prop-types';

const PlanetProperty = (props) => (
        <li className="list-group-item">
          <div className="row">
            <div className="col-8">
              {props.name}: {props.value}
            </div>
            <div className="col">
              <button className="btn btn-danger btn-sm" onClick={(e) => props.onDelete(e)} value={props.name}>Delete</button>
            </div>
          </div>
        </li>
);

PlanetProperty.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
};

export default PlanetProperty;
