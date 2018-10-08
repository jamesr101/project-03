const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI = `mongodb://localhost:27017/artmapper-${env}`;
const secret = 'Hjs*sa/%sj-pZas';

// https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Pablo_Picasso
//
// http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=Vincent_van_Gogh

// Object.keys(data.query.pages)[0]



module.exports = { port, dbURI, secret };
