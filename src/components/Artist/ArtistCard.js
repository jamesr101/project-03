import React from 'react';

const ArtistCard = ({name, image, dateBorn, dateDeath}) => {
  let born;
  let dead;

  if (dateBorn) {
    born = parseFloat(dateBorn.toString().split('').slice(0,4).join(''));
  }

  if (dateDeath) {
    dead = parseFloat(dateDeath.toString().split('').slice(0,4).join(''));
  }

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
        {dateBorn && <p> {born} - {dead}</p>}
      </div>
    </div>

  );
};

export default ArtistCard;
