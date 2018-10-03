import React from 'react';

const ArtistCard = ({name, image, prepTime, cookTime, difficulty}) => {
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
        <p><strong>Prep time:</strong>{prepTime} mins</p>
        <p><strong>Cooking Time:</strong>{cookTime} mins</p>
        <p><strong>Serves: </strong>{'*'.repeat(difficulty)}</p>
      </div>
    </div>

  );
};

export default ArtistCard;
