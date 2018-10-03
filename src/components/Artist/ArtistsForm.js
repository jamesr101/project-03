import React from 'react';

const ArtistsForm = ({ handleSubmit, handleChange, artist, errors }) => {
  return(
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={artist.name  || ''}
          />
          {errors.name && <small className="help is-danger"> {errors.name} </small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Image</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="image"
            placeholder="Image"
            onChange={handleChange}
            value={artist.image || ''}
          />
          {errors.image && <small className="help is-danger"> {errors.image} </small>}
        </div>
      </div>

      <div className="field">
        <label className="label">info</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="info"
            placeholder="info"
            onChange={handleChange}
            value={artist.info || ''}
          />
          {errors.info && <small className="help is-danger"> {errors.info} </small>}
        </div>
      </div>

      <div className="field">
        <label className="label">wikiLink</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="wikiLink"
            placeholder="wikiLink"
            onChange={handleChange}
            value={artist.wikiLink || ''}
          />
          {errors.wikiLink && <small className="help is-danger"> {errors.wikiLink} </small>}
        </div>
      </div>

      <button className="button is-primary">Submit</button>
    </form>
  );
};

export default ArtistsForm;
