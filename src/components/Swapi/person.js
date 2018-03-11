import * as React from 'react';
import PropTypes from 'prop-types';

const Person = (props) => (
  <li className="list-group-item">{props.person.name}</li>
);

Person.propTypes = {
  person: PropTypes.object.isRequired
};

export default Person;