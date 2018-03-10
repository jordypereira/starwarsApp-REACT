import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import Header from '../Header/Header';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route path='*' component={Header} />
        <Route exact path='/' component={Home} />
      </div>
    );
  }
}

export default App;