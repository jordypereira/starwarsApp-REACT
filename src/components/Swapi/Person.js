import * as React from 'react';
import PropTypes from 'prop-types';

const Person = (props) => (
  <li className="list-group-item">
    <div className="row">
      <div className="col-8">
        {props.person.name}
      </div>
      <div className="col">
        <button className="btn btn-danger btn-sm" onClick={(e) => props.onDelete(e)} value={props.name}>Delete</button>
      </div>
    </div>
  </li>
);

Person.propTypes = {
  person: PropTypes.object.isRequired
};

export default Person;