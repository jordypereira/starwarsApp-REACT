import * as React from 'react';
import Resident from './Resident';
import PlanetProperty from './PlanetProperty';
import * as peopleService from '../../services/Swapi/people.service';
import {capitalizeFirstLetter} from "../../functions";
import PlanetHeader from "./PlanetHeader";
import _ from "lodash/array";

export default class Planet extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          residents: [],
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
          ],
          hideResidents: true,
      };
  }
  
  componentDidMount() {
    this.setState({
       allProperties: _.difference(Object.keys(this.props.planet), this.state.disabledProperties)
    });
  }

  getResidents() {

      if(this.state.residents.length === 0){
          this.props.planet.residents.forEach(url => {
              const cachedResident = localStorage.getItem(url);
              if (cachedResident) {
                  this.setResident(JSON.parse(cachedResident));
                  return;
              }
              peopleService.getFromUrl(url)
                .then(response => this.setResidentInLocalStorage(response));
          });
          this.setState({hideResidents: false})
      }
  }

  setResident(response){
      this.setState({ residents: [...this.state.residents, response] });
  }

  setResidentInLocalStorage(response){
      this.setResident(response);
      localStorage.setItem(response.url, JSON.stringify(response));
  }

  renderResidents() {
      return this.state.residents.map((resident, i) => (
          <Resident resident={resident} key={i} />
          ));
  }

  showResidents(){
      this.getResidents();
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

  render () {
    const planet = this.props.planet;
    const residents = planet.residents.length ? this.renderResidents() : (<li className="list-group-item"> This planet has no residents</li>) ;
    const properties = this.state.shownProperties.length ? this.renderProperties() : '' ;
    const showResidentsButton = (planet.residents.length && this.state.hideResidents) ? (
        <button className="btn btn-secondary btn-sm" onClick={() => this.showResidents()}>Show</button>) : '';

    return (
      <div className="card" style={{width: '18rem', marginBottom: '10px'}}>
        <PlanetHeader name={planet.name} onAdd={this.addProperty.bind(this)} properties={this.getRemainingProperties()}/>
        <ul className="list-group">
          {properties}
          <li className="card-header d-flex w-100 justify-content-between">
              <b>Residents:</b>
              {showResidentsButton}
          </li>
          {residents}      
        </ul>
      </div>
    );   
  }
}