import * as React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const Home = ({data: {allPlanets = []}}) => (
    <main>
      <h2>All custom Planets</h2>
      <ul>
        {allPlanets.map(p => (
          <li key={p.id}>{p.name}, a planet with a {p.climate.toLowerCase()} climate. It's population is {p.population.toLowerCase()}.</li>
        ))}
      </ul>
    </main>
);

const allPlanetsQuery = gql`
  {
  allPlanets {
    id
    name
    climate
    population
  }
}
`;

export default graphql(allPlanetsQuery)(Home);