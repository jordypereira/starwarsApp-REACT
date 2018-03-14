import React from 'react';
import {Route} from 'react-router-dom';
import Header from '../Header/Header';
import Planets from '../Swapi/Planets';
import PlanetAdd from "../Swapi/PlanetAdd";
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import Home from "../Home/Home";
import MarsLoader from "../Loader/mars-loader";

const client = new ApolloClient({
  link: new HttpLink({uri: 'https://quiet-atoll-63686.herokuapp.com/graphql'}),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Route path='*' component={Header}/>
      <div className="container">
        <Route exact path='/' component={Home}/>
        <Route exact path='/planets' component={Planets}/>
        <Route exact path='/planets/add' component={PlanetAdd}/>
        <Route exact path='/planetsloader' component={MarsLoader}/>
      </div>
    </div>
  </ApolloProvider>
);

export default App;