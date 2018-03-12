import * as React from 'react';
import Resident from './Resident';
import PlanetProperty from './PlanetProperty';
import * as peopleService from '../../services/Swapi/people.service';
import PlanetHeader from "./PlanetHeader";
import _ from "lodash/array";
import PropTypes from "prop-types";

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
          loadingResidents: true,
      };
  }
  
  componentDidMount() {
    this.setAllProperties();
  }

  setAllProperties() {
      this.setState({
          allProperties: _.difference(Object.keys(this.props.planet), this.state.disabledProperties)
      });
  }

  getResidents() {
      if(this.state.residents.length === 0){
          this.props.planet.residents.forEach(url => {
              let cachedResident = localStorage.getItem(url);
              if (cachedResident) {
                  this.setResident(JSON.parse(cachedResident));
              }else{
                  peopleService.getFromUrl(url)
                    .then(response => this.setResidentInLocalStorage(response));
              }
          });
          this.setState({hideResidents: false})
      }
  }

  setResident(resident){
      this.setState(prevState => ({
          residents: [...prevState.residents, resident.name],
          loadingResidents: false,
      }));
  }

  setResidentInLocalStorage(resident){
      this.setResident(resident);
      localStorage.setItem(resident.url, JSON.stringify(resident));
  }

  renderResidents(loading = false) {
      if(this.props.planet.residents.length){
          if(loading){
              return <li className="list-group-item">Loading Residents</li>
          }
        return this.state.residents.map((resident, i) => (
          <Resident resident={resident} key={i} />
        ));
      }
      else{
          return <li className="list-group-item">This planet has no residents</li>
      }
  }

  showResidents(){
      this.getResidents(true);
  }

  renderProperties() {
      return this.state.shownProperties.map((element, i) => (
        <PlanetProperty name={element} value={this.props.planet[element]} onDelete={this.deleteProperty.bind(this)} key={i} />
      ))
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
          {this.renderResidents()}
        </ul>
      </div>
    );   
  }
}

Planet.propTypes = {
  planet: PropTypes.object,
};