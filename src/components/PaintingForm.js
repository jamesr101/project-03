import React from 'react';
import { Link } from 'react-router-dom';
import ReactFilestack from 'react-filestack';

const FILESTACK_API_KEY = 'Avqe4wSLLQlWD6gW9ymKgz';

const PaintingForm = ({ handleSubmit, handleChange, painting, errors, artists}) => {
// const PaintingForm = ({ handleSubmit, handleChange, handleImage, painting, errors, photo, artists}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Image</label>
        <div className="control">

          <ReactFilestack
            apikey={ FILESTACK_API_KEY }
            mode={'pick'}
            onSuccess={(response) => handleChange({
              target: {
                name: 'image',
                value: response.filesUploaded[0].url
              }})}
            onError={(e) => console.log(e)}
            buttonText={'Add Picture'}
          />

          <input
            className={`input ${errors.image ? 'is-danger' : ''}`}
            name="image"
            placeholder="Image"
            //onChange={ handleImage } //aviv
            onChange={ handleChange }
            value={painting.image || ''}
          />
          {errors.image && <small className="help is-danger">{errors.image}</small>}
        </div>
      </div>
      <div className="section">
        <img src={ painting.image } alt='upload a photo' height="200" />
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
              <Link className="navbar-item" to="/artists/new">add a new artist</Link>
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
        <label className="label">Latitude</label>
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
        <label className="label">Longitude</label>
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
