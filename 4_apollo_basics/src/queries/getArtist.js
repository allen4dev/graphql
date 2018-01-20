import gql from 'graphql-tag';
import artistFields from './../fragments/artist';

export default gql`
  query GetArtist($id: Int!) {
    getArtist(id: $id) {
      ...ArtistFields
    }
  }

  ${artistFields}
`;
