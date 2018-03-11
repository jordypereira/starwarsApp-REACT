import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Person from './Person';
import PlanetProperty from './PlanetProperty';
import * as peopleService from '../../services/Swapi/people.service';

export default class Planet extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          people: [],
          properties: [
              'climate',
              'terrain',
            'population',
          ]
      };
  }
  
  componentDidMount() {
    this.props.planet.residents.forEach(element => {
      peopleService.getFromUrl(element).then(response => this.setState({ people: [...this.state.people, response] }));      
    });
  }

  renderPeople() {
      return this.state.people.map((person, i) => (
          <Person person={person} key={i} name={i} onDelete={this.deleteResident.bind(this)} />
          ));
  }

  renderProperties() {
      return this.state.properties.map((element, i) => (
          <PlanetProperty name={this.capitalizeFirstLetter(element)} value={this.props.planet[element]} onDelete={this.deleteProperty.bind(this)} key={i} />
      ));
  }

  deleteProperty(e) {
    const property = e.target.value.toLowerCase();
    this.setState({
      properties: this.state.properties.filter(i => i !== property)
    });
  }

  deleteResident(e) {
    const property = e.target.value;
    console.log(property)
    console.log(this.state.people)
    console.log(this.state.properties)
    this.setState({
      people: this.spliceNoMutate(this.state.people, property)
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  spliceNoMutate(myArray,indexToRemove) {
    return myArray.slice(0,indexToRemove).concat(myArray.slice(indexToRemove+1));
  }

  render () {
    const planet = this.props.planet;
    const residents = planet.residents.length ? this.renderPeople() : (<li className="list-group-item"> This planet has no residents</li>) ;
    const properties = this.state.properties.length ? this.renderProperties() : '' ;


    return (
      <div className="card" style={{width: '18rem', marginBottom: '10px'}}>
        <Link to={`/${planet.id}`}>
          <div className="card-header">
            {planet.name}
          </div>
        </Link>
        <ul className="list-group">
          {properties}
          <div className="card-header">
            Residents:
          </div>
          {residents}      
        </ul>
      </div>
    );   
  }
}

Planet.propTypes = {
  planet: PropTypes.object.isRequired
};