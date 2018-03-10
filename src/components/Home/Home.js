import * as React from 'react';
import Planets from '../Swapi/Planets';
import { Link } from 'react-router-dom';


const Home = () => (
    <main>
      <ul>
        <li><Link to={'/planets'}>Planets</Link></li>
      </ul>
    </main>
);

export default Home;