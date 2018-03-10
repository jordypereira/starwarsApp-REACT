import * as React from 'react';
import { Link } from 'react-router-dom';
import Person from './person';
import * as peopleService from '../../services/Swapi/people.service';

export default class Planets extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          people: []
      };
  }

  componentWillMount() {
    this.props.residents.forEach(element => {
      peopleService.getFromUrl(element).then(response => this.setState({ people: [...this.state.people, response] }));      
    });
  }

  renderPeople() {
      return this.state.people.map((person, i) => (
          <Person name={person.name} key={i} />
          ));
  }

  render () {
    return (
      <div className="card" style={{width: '18rem', marginBottom: '10px'}}>
        <Link to={`/${this.props.id}`}>
          <div className="card-header">
            {this.props.name}
          </div>
        </Link>
        <ul className="list-group">
        Climate:
          <li className="list-group-item">{this.props.climate}</li>
          Terrain:
          <li className="list-group-item">{this.props.terrain}</li>
          Population:
          <li className="list-group-item">{this.props.population}</li>
        <ul className="list-group">
        Residents:          
          {this.props.residents.length ? this.renderPeople() : (<li className="list-group-item"> This planet has no residents</li>)}    
          </ul>      
        </ul>
      </div>
    );   
  }
};