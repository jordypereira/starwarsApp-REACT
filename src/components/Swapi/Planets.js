import * as React from 'react';
import Planet from './Planet';
import * as planetService from '../../services/Swapi/planets.service';

export default class Planets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            nextPlanet: '',
        };
    }

    // React lifecycle event
    // https://reactjs.org/docs/react-component.html#the-component-lifecycle
    componentWillMount() {
      planetService.getAll().then(response => this.setState(
        {planets: response.results, nextPlanet: response.next }, 
        () => this.fetchNextPlanet(this.state.nextPlanet)
      ));
    }

    fetchNextPlanet(url){
      if(url){
        planetService.getFromUrl(url).then(response => this.setState({ planets: this.state.planets.concat(response.results), nextPlanet: response.next }, () => this.fetchNextPlanet(this.state.nextPlanet)));      
      }  
    }

    renderPlanets() {
      console.log(this.state.planets)
      return this.state.planets.map((planet, i) => (
          <div className="col" key={i}>
            <Planet name={planet.name} climate={planet.climate} terrain={planet.terrain} population={planet.population} residents={planet.residents} id={i} />
          </div>
            ));
    }

    render() {
      return (
          <section>
            <h2>All Planets</h2>
            <div className="row cards">            
              {this.state.planets.length ? this.renderPlanets() : (<p>No Planets found</p>)}
            </div>
          </section>
          );
    }
};
        