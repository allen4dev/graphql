import React from 'react';

import Artist from './../Artist/';

const ArtistList = ({ artists }) => {
  return (
    <section className="ArtistList">
      {artists.map(artist => <Artist key={artist.id} {...artist} />)}
    </section>
  );
};

export default ArtistList;
