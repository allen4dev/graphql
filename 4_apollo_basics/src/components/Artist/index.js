import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const Artist = props => {
  return (
    <article className="Artist">
      <Link className="Artist-link" to={`/artist/${props.id}`}>
        <h4 className="Artist-name">{props.name}</h4>
        <p className="Artist-description">{props.description}</p>
      </Link>
    </article>
  );
};

export default Artist;
