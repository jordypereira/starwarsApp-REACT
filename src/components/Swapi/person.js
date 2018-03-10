import * as React from 'react';
import { Link } from 'react-router-dom';

const Person = (props) => (
  <li className="list-group-item">{props.name}</li>
);

export default Person;