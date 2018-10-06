// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
client
  .logoDetection('/Users/avivisrael/Downloads/p1.jpeg')
  .then(results => {
    console.log(results);
    const labels = results[0].logoAnnotations;
    console.log(labels);
    // console.log('logo:');
    // labels.forEach(label => console.log(label));
    // const labels = results[0].labelAnnotations;
    //
    // console.log('Labels:');
    // labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
