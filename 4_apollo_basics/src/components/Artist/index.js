import React from 'react';

import './index.css';

const Artist = props => {
  return (
    <article className="Artist">
      <h4 className="Artist-name">{props.name}</h4>
      <p className="Artist-description">{props.description}</p>
    </article>
  );
};

export default Artist;
