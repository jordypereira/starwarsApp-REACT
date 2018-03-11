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
              'terrain'
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
          <Person person={person} key={i} />
          ));
  }

  renderProperties() {
      return this.state.properties.map((element, i) => (
          <PlanetProperty name={this.capitalizeFirstLetter(element)} value={this.props.planet[element]} key={i} />
      ));
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
          {/*<PlanetProperty name="Climate" value={planet.climate} />*/}
          {/*<PlanetProperty name="Terrain" value={planet.terrain} />*/}
          {/*<PlanetProperty name="Population" value={planet.population} />*/}
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