const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);

const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Artist = require('../models/artist');
const Trophy = require('../models/trophy');
const Painting = require('../models/trophy');

let seededUsers, seededArtist = [];

mongoose.connectAsync(dbURI)
  .then(db => db.dropDatabase())
  .then(() => User.create({
    username: 'Aviv',
    email: 'aviv@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  },{
    username: 'Theodhor',
    email: 'theodhor@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  },{
    username: 'James',
    email: 'james@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  }))
  .then((users) => seededUsers = users)
  .then(() => Artist.create({
    name: 'Pablo Picasso',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Pablo_picasso.jpg',
    dateBorn: 'October 25, 1881',
    dateDeath: 'April 8, 1973',
    info: 'Pablo Ruiz Picasso (/pɪˈkɑːsoʊ, -ˈkæsoʊ/;[2] Spanish: [ˈpaβlo piˈkaso]; 25 October 1881 – 8 April 1973) was a Spanish painter, sculptor, printmaker, ceramicist, stage designer, poet and playwright who spent most of his adult life in France. Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture,[3][4] the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d\'Avignon (1907), and Guernica (1937), a dramatic portrayal of the bombing of Guernica by the German and Italian airforces during the Spanish Civil War.',
    wikiLink: 'https://en.wikipedia.org/wiki/Pablo_Picasso'
  }))
  .then((artist) => seededArtist = artist)
  .then(() => Trophy.create({
    name: 'Novice',
    image: 'http://www.hobbycraft.co.uk/supplyimages/615651_1000_1_800.jpg'
  },{
    name: 'Journeyman',
    image: 'https://www.trophycentre.co.nz/wp-content/uploads/2017/12/TC100.jpg'
  },{
    name: 'Master',
    image: 'https://www.partyrama.co.uk/wp-content/uploads/2016/06/champions-trophy-cardboard-cutout-167cms-product-image.jpg'
  }))
  .then(() => Painting.create({
    title: 'Weeping Woman',
    image: 'https://www.tate.org.uk/art/images/work/T/T05/T05010_10.jpg',
    date: '1937',
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    wikiLink: 'https://en.wikipedia.org/wiki/The_Weeping_Woman',
    location: {
      latitude: 51.5076,
      longitude: 0.0994
    },
    user: seededUsers[0],
    artist: seededArtist
  }))
  .then(() => console.log(seededUsers, seededArtist))

  .then(() => console.log('***** Database seeded! *****'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
