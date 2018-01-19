import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ArtistList from './../../components/ArtistList';

class Home extends Component {
  render() {
    const { loading, error, allArtists } = this.props.data;

    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (error) {
      return <pre>{JSON.stringify(error, undefined, 2)}</pre>;
    }

    return (
      <div className="Home">
        <ArtistList artists={allArtists} />
      </div>
    );
  }
}

const query = gql`
  query AllArtists {
    allArtists(perPage: 10) {
      id
      name
      description
    }
  }
`;

export default graphql(query)(Home);
