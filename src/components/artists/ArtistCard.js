import React from 'react';

const ArtistCard = ({name, image, dateBorn, dateDeath}) => {

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
        {(dateDeath && dateBorn) ? <p> {parseFloat(dateBorn)} - {parseFloat(dateDeath)}</p> : dateBorn && <p> {parseFloat(dateBorn)} </p>}
      </div>
    </div>

  );
};

export default ArtistCard;
