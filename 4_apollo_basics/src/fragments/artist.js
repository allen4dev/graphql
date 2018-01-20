import gql from 'graphql-tag';

export default gql`
  fragment ArtistFields on Artist {
    id
    name
    description
  }
`;
