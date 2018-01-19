import React from 'react';

import Artist from './../Artist/';

const ArtistList = ({ artists }) => {
  return (
    <section className="ArtistList">
      {artists.map((artist, i) => <Artist key={i} />)}
    </section>
  );
};

export default ArtistList;
