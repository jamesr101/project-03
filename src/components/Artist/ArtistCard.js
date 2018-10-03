import React from 'react';

const ArtistCard = ({name, image}) => {
  return (
    <div className="card">
      <header className="card-header">
        <h2 className="card-header-title">{name}</h2>
      </header>
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        <p>Data</p>
      </div>
    </div>

  );
};

export default ArtistCard;
