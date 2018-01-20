import gql from 'graphql-tag';
import artistFields from './../fragments/artist';

export default gql`
  query GetArtists {
    getArtists {
      ...ArtistFields
    }
  }

  ${artistFields}
`;
