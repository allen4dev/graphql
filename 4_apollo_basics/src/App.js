import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import Detail from './containers/Detail';

import Header from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/artist/:id" component={Detail} />
    </div>
  );
};

export default App;
