import * as React from 'react';
import {includes} from "lodash/collection";
import * as peopleService from "../../services/Swapi/people.service";
import * as planetService from "../../services/Swapi/planets.service";

export default class PlanetAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planet: {
        name: '',
        climate: '',
        population: '',
        residents: [],
      },
      people: [],
      nextPerson: '',
      loadingPeople: true,
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

  setPlanetsInLocalStorage() {
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
      this.setPlanetsInLocalStorage();
      this.setState({loadingPeople: false});
    }
  }

  updateName(value) {
    this.setState({
      planet: {
        name: value,
      }
    });
  }

  updateClimate(value) {
    this.setState({
      planet: {
        climate: value,
      }
    });
  }

  updatePopulation(value) {
    this.setState({
      planet: {
        population: value,
      }
    });
  }

  updateResident(resident) {
    let residents = [...this.state.planet.residents]; // copy

    if (residents.includes(resident)) {
      residents = residents.filter(c => c !== resident); // remove course
    } else {
      residents.push(resident); // add course
    }

    this.setState({
      planet: {
        residents,
      }
    });
  }

  renderPeople() {
    return this.state.people.map((resident, i) => (
        <option value={resident.url} key={i}>{resident.name}</option>
      )
    );
  }

  onSubmit(e) {
    e.preventDefault(); // stop default form submit

  }

  render() {
    return (
      <section>
        <h2>Add a Planet</h2>

        <form action="" onSubmit={(e) => this.onSubmit(e)} autoComplete="off">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" id="name" value={this.state.planet.name}
                   onChange={(e) => this.updateName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="climate">Climate</label>
            <input type="text" className="form-control" name="climate" id="climate" value={this.state.planet.climate}
                   onChange={(e) => this.updateClimate(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="population">Population</label>
            <input type="text" className="form-control" name="population" id="population" value={this.state.planet.population}
                   onChange={(e) => this.updatePopulation(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="resident">Residents</label>
            <select className="form-control" name="resident" id="resident" onChange={(e) => this.updateResident(e.target.value)}>
              {this.renderPeople()}
            </select>
          </div>


          <button className="btn btn-primary" type="submit">Save the Planet!</button>
        </form>
      </section>
    );
  }
}