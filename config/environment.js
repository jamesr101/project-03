const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/artmapper-${env}`;
const secret = process.env.SECRET || 'Hjs*sa/%sj-pZas';

module.exports = { port, dbURI, secret };
