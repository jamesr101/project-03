import React from 'react';
import { Link } from 'react-router-dom';
import ReactFilestack from 'react-filestack';

const FILESTACK_API_KEY = 'Avqe4wSLLQlWD6gW9ymKgz';

const PaintingForm = ({ handleSubmit, handleChange, painting, errors, artists, getLocation, findAddress}) => {

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Painting</label>
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

          {/* <input
            className={`input ${errors.image ? 'is-danger' : ''}`}
            name="image"
            placeholder="Image"
            //onChange={ handleImage } //aviv
            onChange={ handleChange }
            value={painting.image || ''}

          /> */}
          {errors.image && <small className="help is-danger">{errors.image}</small>}
        </div>
      </div>

      <div className="section">
        <img src={ painting.image || 'https://i0.wp.com/hifadhiafrica.org/wp-content/uploads/2017/01/default-placeholder.png' } alt='upload a photo' height="200" />
      </div>

      <div className="field">
        <label className="label">Artist</label>
        <div className="control">
          <div className="select">
            <select onChange={handleChange} name="artist">
              <option>
                Please select artist
              </option>
              {artists && artists.map(artist =>
                <option
                  key={artist._id}
                  value={artist._id}
                >
                  {artist.name}
                </option>
              )}
            </select>
          </div>
        </div>
        <div>
          <Link className="button" to="/artists/new">add a new artist</Link>
        </div>
      </div>

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={painting.title || ''}
          />
          {errors.name && <small className="help is-danger">{errors.name}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Year</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="date"
            placeholder="Year"
            onChange={handleChange}
            value={painting.date || ''}
          />
          {errors.name && <small className="help is-danger">{errors.name}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Wikipedia Link</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="wikiLink"
            placeholder="If available, please add a Wikipedia Link"
            onChange={handleChange}
            value={painting.wikiLink}
          />
          {errors.name && <small className="help is-danger">{errors.name}</small>}
        </div>
      </div>

      <div className="field">
        <div className="button is-primary" onClick={getLocation}>Use my Location</div>
        <p>{painting.location && painting.location.latitude + ', ' + painting.location.longitude }</p>
      </div>

      <div className="field">
        <label className="label">Enter address</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="address"
            placeholder="Enter location"
            onChange={handleChange}
            value={painting.address}
          />
          {errors.name && <small className="help is-danger">{errors.name}</small>}
          <div className="button" onClick={findAddress}>Find address</div>
        </div>
      </div>

      <button className="button is-primary">Submit</button>

    </form>
  );

};

export default PaintingForm;
