import React from 'react';

const ArtistCard = ({name, image, dateBorn, dateDeath}) => {
  let born;
  let dead;

  if (dateBorn) {
    born = parseFloat(dateBorn);
  }

  if (dateDeath) {
    dead = parseFloat(dateDeath);
  }

  return (
    <div className="card ">
      <header className="card-header">
        <h2 className="card-header-title">{name}</h2>
      </header>
      <div className="card-image ">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        {dateBorn && <p> {born} - {dead}</p>}
      </div>
    </div>

  );
};

export default ArtistCard;
