import React from 'react';

const JourneyCard = ({title, image, info}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img src={ image } alt={ title } />
            </figure>
          </div>
          <div className="media-content">
            <p className="subtitle is-4">{ title }</p>
            <p className="subtitle is-6">{ info }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyCard;
