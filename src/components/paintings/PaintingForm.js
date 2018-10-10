import React from 'react';
import { Link } from 'react-router-dom';
import ReactFilestack from 'react-filestack';

const FILESTACK_API_KEY = 'Avqe4wSLLQlWD6gW9ymKgz';



const PaintingForm = ({ handleSubmit, handleChange, painting, errors, artists, getLocation, findAddress, findingAddress, selectedArtist }) => {

  return (
    <form onSubmit={handleSubmit}>

      <img src={ painting.image || '../../assets/images/image-placeholder.png' } alt='upload a photo' height="200" />

      <div className="field">
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
            buttonClass={'button is-rounded'}
          />

          {errors.image && <small className="help is-danger">{errors.image}</small>}
        </div>
      </div>


      <div className="field">
        <label className="label">Artist</label>
        <div className="control">
          <div className="level">
            <div className="level-left">
              <div className="level-item form-or">
                <div className="select">
                  <select onChange={handleChange} name="artist" value={selectedArtist}>
                    <option>
                      Please select artist
                    </option>
                    {artists && artists.map(artist =>
                      <option key={artist._id} value={selectedArtist || artist._id} >
                        {artist.name}
                      </option>
                    )}
                  </select>

                </div>
              </div>
              <p className="level-item form-or">or</p>
              <div className="level-item">
                <Link className="button is-rounded" to="/artists/new">Add new artist</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className={`input ${errors.title ? 'is-danger' : ''}`}
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={painting.title || ''}
          />
          {errors.title && <small className="help is-danger">{errors.title}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Year</label>
        <div className="control">
          <input
            className={`input ${errors.date ? 'is-danger' : ''}`}
            name="date"
            placeholder="Year"
            onChange={handleChange}
            value={painting.date || ''}
          />
          {errors.date && <small className="help is-danger">{errors.date}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Information</label>
        <div className="control">
          <input
            className={`input ${errors.info ? 'is-danger' : ''}`}
            name="info"
            placeholder="Information about artwork"
            onChange={handleChange}
            value={painting.info || ''}
          />
          {errors.info && <small className="help is-danger">{errors.info}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Wikipedia Link</label>
        <div className="control">
          <input
            className={`input ${errors.wikiLink ? 'is-danger' : ''}`}
            name="wikiLink"
            placeholder="If available, please add a Wikipedia Link"
            onChange={handleChange}
            value={painting.wikiLink || ''}
          />
          {errors.wikiLink && <small className="help is-danger">{errors.wikiLink}</small>}
        </div>
      </div>

      <div className="field ">
        <label className="label">
          Location{painting.location && ': ' + painting.location.latitude + ', ' + painting.location.longitude}
        </label>
        {errors.address && <small className="help is-danger">{errors.address}</small>}

        <div className="level">

          <div className={`button level-item is-rounded ${findingAddress ? 'is-loading' : ''}`} onClick={getLocation}>Use my Location</div>

          <p className="level-item form-or">or</p>

          <div className="field has-addons level-item">
            <div className="control is-expanded">
              <input
                className={`input ${errors.address ? 'is-danger' : ''}`}
                name="address"
                placeholder="Enter address"
                onChange={handleChange}
                value={painting.address || ''}
              />
            </div>
            <div className="control">
              <div className="button" onClick={findAddress}>Find address</div>
            </div>
          </div>
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

export default PaintingForm;
