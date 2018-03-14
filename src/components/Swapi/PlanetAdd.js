import * as React from 'react';
import * as peopleService from "../../services/Swapi/people.service";
import * as array from "lodash/array";
import Resident from "./Resident";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class PlanetAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      climate: '',
      population: '',
      residents: [],
      nameError: '',
      climateError: '',
      populationError: '',

      people: [],
      nextPerson: '',
      loadingPeople: true,
      submitPlanet: false,
    };
  }

  componentDidMount(){
    this.getPeople();
  }

  getPeople() {
    const cachedPeople = localStorage.getItem('people');
    if (cachedPeople) {
      this.setState({people: JSON.parse(cachedPeople)});
      this.setState({loadingPeople: false});
      return;
    }

    peopleService.getAll()
      .then(response => this.setPeople(response));
  }

  setPeople(response) {
    this.setState(
      {people: response.results, nextPerson: response.next},
      () => this.fetchNextPerson(this.state.nextPerson)
    )
  }

  setPeopleInLocalStorage() {
    localStorage.setItem('people', JSON.stringify(this.state.people));
  }

  fetchNextPerson(url) {
    if (url) {
      peopleService.getFromUrl(url).then(response => this.setState({
        people: this.state.people.concat(response.results),
        nextPerson: response.next
      }, () => this.fetchNextPerson(this.state.nextPerson)));
    }
    else {
      this.setPeopleInLocalStorage();
      this.setState({loadingPeople: false});
    }
  }

  onInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
        [name]: value,
    });
  }

  updateResidents() {
    this.setState(prevState => {
      return {
          residents: [...prevState.residents, this.resident.value]
      };
    });
  }

  renderPeople() {
    if(this.state.residents){
      const residentNames = this.state.people.map(resident => resident.name);
      return array.difference(residentNames, this.state.residents).map((resident, i) => (
          <option value={resident} key={i}>{resident}</option>
        )
      );
    }
  }

  renderResidents(){
    return this.state.residents.map((resident, i) => (
      <Resident key={i} resident={resident}/>
    ))
  }

  validate(){
    let isError = false;
    const errors = {
      nameError: '',
      climateError: '',
      populationError: '',
    };

    if(this.state.name < 1){
      errors.nameError = 'Please fill in a Planet name.';
      isError = true;
    }
    if(this.state.climate < 1){
      errors.climateError = 'Please fill in a Climate.';
      isError = true;
    }
    if(this.state.population < 1){
      errors.populationError = 'Please fill in a Population count.';
      isError = true;
    }

    this.setState(errors);

    return isError;
  }

  static onSubmit(e) {
    e.preventDefault(); // stop default form submit

    const err = this.validate();
    if (!err) {
      const {name, climate, population, residents } = this.state;
      const planet = {
        name,
        climate,
        population,
        residents
      };
      // clear form
      this.setState({
        name: '',
        climate: '',
        population: '',
        residents: [],
        nameError: '',
        climateError: '',
        populationError: '',
        submitPlanet: true,
      }, () => setTimeout(() => {
        this.setState({
          submitPlanet: false,
        })
      }, 5000));

      this.savePlanet(planet);
    }
  }

  savePlanet = async (planet) => {
    const response = this.props.mutate({
      variables: planet,
    });

    console.log(response);

  };

  render() {
    const {name, climate, population, nameError, climateError, populationError, submitPlanet } = this.state;
    const residents = this.state.residents ? this.renderResidents() : '';
    return (
      <section>
        <h2>Add a Planet</h2>

        <form action="" autoComplete="off" onSubmit={PlanetAdd.onSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className={"form-control" + (nameError ? " animated bounce is-invalid" : "")}
                   name="name" id="name" placeholder={"Earth"}
                   value={name}
                   onChange={this.onInputChange.bind(this)}/>
            <div className="invalid-feedback">
              {nameError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="climate">Climate</label>
            <input type="text" className={"form-control" + (climateError ? " animated bounce is-invalid" : "")}
                   name="climate" id="climate" placeholder={"Rainy"}
                   value={climate}
                   onChange={this.onInputChange.bind(this)}/>
            <div className="invalid-feedback">
              {climateError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="population">Population</label>
            <input type="text" className={"form-control" + (populationError ? " animated bounce is-invalid" : "")}
                   name="population" id="population" placeholder={"10000"}
                   value={population}
                   onChange={this.onInputChange.bind(this)}/>
            <div className="invalid-feedback">
              {populationError}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="resident">Residents</label>
            <ul>
              {residents}
            </ul>
            <div className="input-group">
              <select className="custom-select" name="resident" id="resident" ref={(resident) => { this.resident = resident; }}>
                {this.renderPeople()}
              </select>
              <div className="input-group-append">
                <button className="btn btn-inline btn-dark" onClick={this.updateResidents.bind(this)} type="button">Add Resident</button>
              </div>
            </div>
          </div>
          <button className={"btn btn-primary" + (submitPlanet ? " submitPlanet" : "")} type="submit">{submitPlanet ? "Planting a new Planet!" : "Save the Planet!"}</button>
        </form>
      </section>
    );
  }
}

const createPlanetMutation = gql `
mutation($name: String! $climate: String! $population: String!){
  createPlanet(name: $name, climate: $climate, population: $population)
}
`;

export default graphql(createPlanetMutation)(PlanetAdd);