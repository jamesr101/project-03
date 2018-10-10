import React from 'react';

const PaintingCard = ({title, image, date, info}) => {
  const year = parseFloat(date);

  return (
    <div className="card">
      <header className="card-header">
        <h2 className="card-header-title">{title}</h2>
      </header>
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        <p> {info} </p>
        <br></br>
        <p> This painting was made in {year} </p>
      </div>
    </div>

  );
};

export default PaintingCard;
