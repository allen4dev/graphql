import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
import Detail from './containers/Detail';

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/artist/:id" component={Detail} />
    </div>
  );
};

export default App;
