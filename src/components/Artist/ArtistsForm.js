import React from 'react';
import ReactFilestack from 'react-filestack';

const FILESTACK_API_KEY = 'Avqe4wSLLQlWD6gW9ymKgz';

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

          <ReactFilestack
            apikey={ FILESTACK_API_KEY }
            mode={'pick'}
            onSuccess={(response) => handleChange({
              target: {
                name: 'image',
                value: response.filesUploaded[0].url
              }})}//(response) => console.log(response)}
            onError={(e) => console.log(e)}
            buttonText={'Add Picture'}
          />

          {/* <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="image"
            placeholder="Image"
            onChange={handleChange}
            value={ artist.image || ''}
          /> */}
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

      <div className="field">
        <label className="label">dateBorn</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="dateBorn"
            placeholder="Date Born"
            onChange={handleChange}
            value={artist.dateBorn || ''}
          />
          {errors.wikiLink && <small className="help is-danger"> {errors.wikiLink} </small>}
        </div>
      </div>

      <div className="field">
        <label className="label">dateDeath</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            name="dateDeath"
            placeholder="Date Death"
            onChange={handleChange}
            value={artist.dateDeath || ''}
          />
          {errors.wikiLink && <small className="help is-danger"> {errors.wikiLink} </small>}
        </div>
      </div>

      <button className="button is-primary">Submit</button>
    </form>
  );
};

export default ArtistsForm;
