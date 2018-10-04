import React from 'react';
import { Link } from 'react-router-dom';

const PaintingForm = ({ handleSubmit, handleChange, handleImage, painting, errors, photo, artists}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Image</label>
        <div className="control">
          <input
            className={`input ${errors.image ? 'is-danger' : ''}`}
            name="image"
            placeholder="Image"
            onChange={ handleImage }
            value={painting.image || ''}
          />
          {errors.image && <small className="help is-danger">{errors.image}</small>}
        </div>
      </div>
      <div className="section">
        <img src={ photo } alt='upload a photo' height="200" />
      </div>
      <div className="field">
        <label className="label">Artist</label>
        <div className="control">
          <div className="select">
            <select onChange={handleChange} name="artist">

              {artists && artists.map(artist =>

                <option
                  key={artist._id}
                  value={artist._id}

                >
                  {artist.name}
                </option>
              )}
            </select>
            <div>
              <Link className="navbar-item" to="/register">add a new artist</Link>
            </div>

          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="title"
            placeholder="Name"
            onChange={handleChange}
            value={painting.title || ''}
          />
          {errors.name && <small className="help is-danger">{errors.name}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="latitude"
            placeholder="latitude"
            onChange={handleChange}
            value={painting.position}
          />
          {errors.name && <small className="help is-danger">{errors.name}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="longitude"
            placeholder="Longitude"
            onChange={handleChange}
            value={painting.position}
          />
          {errors.name && <small className="help is-danger">{errors.name}</small>}
        </div>
      </div>

      <button className="button is-primary">Submit</button>

    </form>
  );

};

export default PaintingForm;
