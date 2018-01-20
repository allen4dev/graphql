import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import ArtistList from './../../components/ArtistList';

import query from './../../queries/getArtists';

class Home extends Component {
  render() {
    const { loading, error, getArtists } = this.props.data;

    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (error) {
      return <pre>{JSON.stringify(error, undefined, 2)}</pre>;
    }

    return (
      <div className="Home">
        <ArtistList artists={getArtists} />
      </div>
    );
  }
}

export default graphql(query)(Home);
