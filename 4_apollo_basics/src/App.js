import React, { Component } from 'react';

import ArtistList from './components/ArtistList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ArtistList artists={new Array(9).fill({})} />
      </div>
    );
  }
}

export default App;
