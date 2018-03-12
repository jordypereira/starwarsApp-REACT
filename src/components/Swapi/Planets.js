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

    componentDidMount() {
      this.getPlanets();
    }

    getPlanets () {
        const cachedPlanets = localStorage.getItem('planets');
        if (cachedPlanets) {
            this.setState({ planets: JSON.parse(cachedPlanets) });
            this.setState({isLoading: false});
            return;
        }

        planetService.getAll()
          .then(response => this.setPlanets(response));
    }

    setPlanets(response) {
        this.setState(
          {planets: response.results, nextPlanet: response.next },
          () => this.fetchNextPlanet(this.state.nextPlanet)
        )
    }

    setPlanetsInLocalStorage(){
        localStorage.setItem('planets', JSON.stringify(this.state.planets));
    }

    fetchNextPlanet(url){
      if(url){
        planetService.getFromUrl(url).then(response => this.setState({ planets: this.state.planets.concat(response.results), nextPlanet: response.next }, () => this.fetchNextPlanet(this.state.nextPlanet)));      
      }  
      else{
        this.setPlanetsInLocalStorage();
        this.setState({isLoading: false});
      }
    }

    renderPlanets() {
      return this.state.planets.map((planet, i) => (
            <Planet planet={planet} id={i} key={i}/>
            ));
    }

    render() {
      let content = '';
      if(!this.state.isLoading){
        if(this.state.planets.length){
          content = this.renderPlanets();
        }else{
          content = (<p>No Planets found</p>);
        }
      }else{
        content = (<p>Planets are loading</p>);
      }
      return (
          <section>
            <h2>All Planets</h2>
            <div className="cards">
              {content}
            </div>
          </section>
          );
    }
}
        