import React from 'react';

const ArtistsForm = ({
  handleSubmit,
  handleChange,
  getArtistData,
  artist,
  errors,
  wikiLink,
  wikiImg,
  wikiPar,
  wikiBorn,
  wikiDeath
}) => {
  return(
    <form onSubmit={handleSubmit}>

      {/* Name Field */}
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="name"
            placeholder="E.g. Pablo Picaso"
            onChange={handleChange}
            onBlur={getArtistData}
            value={artist.name  || ''}
          />
          {errors.name &&   <small className="help is-danger"> {errors.name} </small>}
        </div>
      </div>

      {/* Image Field */}
      <div className="field">
        <div className="control">
          <label className="label">image</label>
          <input
            className={`input ${errors.image ? 'is-danger' : ''}`}
            name="image"
            placeholder="Link to image of the artist"
            onChange={handleChange}
            value={ artist.image || wikiImg }
          />
          {errors.image && <small className="help is-danger"> {errors.image} </small>}
        </div>
      </div>

      { wikiImg &&
        <div className="section">
          <img src={ wikiImg || '../../assets/images/image-placeholder.png' } alt='upload a photo' height="200" />
        </div>
      }

      {/* Biography Field  */}
      {wikiPar &&
        <div className="field">
          <label className="label"></label>
          <p>
            {wikiPar}
          </p>
          <div className="control">
            <input
              className={`input ${errors.info ? 'is-danger' : ''}`}
              name="info"
              placeholder="info"
              onChange={handleChange}
              value={wikiPar || ''}

            />
            {errors.info && <small className="help is-danger"> {errors.info} </small>}
          </div>
        </div>
      }

      {/* Wikipedia Link Field  - option to type manualy or to fill automaticly  */}
      <div className="field">
        <label className="label">Wikipedia Link</label>
        <div className="control">
          <input
            className={`input  ${errors.wikiLink ? 'is-danger' : ''}`}
            name="wikiLink"
            placeholder="Add a wikipedia link"
            onChange={handleChange}
            value={artist.wikiLink || wikiLink || ''}
          />
          {errors.wikiLink && <small className="help is-danger"> {errors.wikiLink} </small>}
        </div>
      </div>

      {/* Artist Born Field  */}
      <div className="field">
        <label className="label">Born</label>
        <div className="control">
          <input
            className={`input  ${errors.dateBorn ? 'is-danger' : ''}`}
            name="dateBorn"
            placeholder="Date of Birth"
            onChange={handleChange}
            value={artist.dateBorn || wikiBorn || ''}
          />
          {errors.dateBorn && <small className="help is-danger"> {errors.dateBorn} </small>}
        </div>
      </div>

      {/* Artist Died Field  */}
      <div className="field">
        <label className="label">Died</label>
        <div className="control">
          <input
            className={`input  ${errors.dateDeath ? 'is-danger' : ''}`}
            name="dateDeath"
            placeholder="Date of Death"
            onChange={handleChange}
            value={artist.dateDeath || wikiDeath || ''}
          />
          {errors.dateDeath && <small className="help is-danger"> {errors.dateDeath} </small>}
        </div>
      </div>

      <div className="level control">
        <div className="level-item">
          <button className="button is-primary is-rounded is-medium">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default ArtistsForm;
