import * as React from 'react';
import Planet from './Planet';
import * as planetService from '../../services/Swapi/planets.service';

export default class Planets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            nextPlanet: '',
            isLoading: true,
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
      else{
        this.setState({isLoading: false})
      }
    }

    renderPlanets() {
      return this.state.planets.map((planet, i) => (
          <div className="col" key={i}>
            <Planet planet={planet} id={i} />
          </div>
            ));
    }

    render() {
      let content = '';
      if(this.state.planets.length){
        if(!this.state.isLoading){
          content = this.renderPlanets();
        }else{
          content = (<p>Planets are loading</p>);
        }
      }else{
        content = (<p>No Planets found</p>);
      }
      return (
          <section>
            <h2>All Planets</h2>
            <div className="row cards">            
              {content}
            </div>
          </section>
          );
    }
}
        