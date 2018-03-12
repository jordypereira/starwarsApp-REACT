import * as React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';
import PlanetProperty from './PlanetProperty';
import * as peopleService from '../../services/Swapi/people.service';
import {spliceNoMutate, capitalizeFirstLetter} from "../../functions";
import PlanetHeader from "./PlanetHeader";
import _ from "lodash";

export default class Planet extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          people: [],
          allProperties: [],
          shownProperties: [
            'climate',
            'terrain',
            'population',
          ],
          disabledProperties: [
            'residents',
            'films',
            'name',
            'url',
            'created',
            'edited'
          ]
      };
  }
  
  componentDidMount() {
    this.props.planet.residents.forEach(element => {
      peopleService.getFromUrl(element).then(response => this.setState({ people: [...this.state.people, response] }));      
    });
    this.setState({
       allProperties: _.difference(Object.keys(this.props.planet), this.state.disabledProperties)
    });
  }

  renderPeople() {
      return this.state.people.map((person, i) => (
          <Person person={person} key={i} name={i} onDelete={this.deleteResident.bind(this)} />
          ));
  }

  renderProperties() {
      return this.state.shownProperties.map((element, i) => (
          <PlanetProperty name={capitalizeFirstLetter(element)} value={this.props.planet[element]} onDelete={this.deleteProperty.bind(this)} key={i} />
      ));
  }

  deleteProperty(e) {
        const property = e.target.value.toLowerCase();
        this.setState({
            shownProperties: this.state.shownProperties.filter(i => i !== property)
    });
  }

  addProperty(e) {
      e.preventDefault();
      const property = e.target.value.toLowerCase();
      this.setState({
          shownProperties: [...this.state.shownProperties, property]
      });
  }

  getRemainingProperties() {
      return _.difference(this.state.allProperties, this.state.shownProperties)
  }

  deleteResident(e) {
    const property = e.target.value;
    this.setState({
      people: spliceNoMutate(this.state.people, property)
    });
  }

  render () {
    const planet = this.props.planet;
    const residents = planet.residents.length ? this.renderPeople() : (<li className="list-group-item"> This planet has no residents</li>) ;
    const properties = this.state.shownProperties.length ? this.renderProperties() : '' ;

    return (
      <div className="card" style={{width: '18rem', marginBottom: '10px'}}>
        <PlanetHeader name={planet.name} onAdd={this.addProperty.bind(this)} properties={this.getRemainingProperties()}/>
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