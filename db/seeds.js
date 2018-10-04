const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);

const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Artist = require('../models/artist');
const Trophy = require('../models/trophy');
const Painting = require('../models/painting');

let seededUsers, seededArtist, seededPaintings = [];

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
  },{
    title: 'The Studio',
    image: 'https://www.tate.org.uk/art/images/work/T/T06/T06802_10.jpg',
    date: '1955',
    info: 'A major painting from the 1950s, Studio depicts the studio of ‘La Californie’, the villa near Cannes where Picasso and his partner Jacqueline Roque had moved in the summer of 1955. A large nineteenth-century villa at the foot of the Sainte Victoire mountain, La Californie was built in Art Nouveau style and had extensive views towards the coast. Picasso used the large main salon on the ground floor as his studio as well as the place where he received and entertained friends and dealers. ',
    location: {
      latitude: 51.5076,
      longitude: -0.0994
    },
    user: seededUsers[0],
    artist: seededArtist
  },{
    title: 'Bust of a Woman',
    image: 'https://www.tate.org.uk/art/images/work/L/L03/L03007_10.jpg',
    date: '1944',
    info: 'Bust of a Woman is a painting in oil on canvas by Pablo Picasso. It depicts a woman whose body is rendered in a semi-abstract style. The face is painted half in white and half in grey, suggesting light and shadow, while the red horizontal and purple vertical lines on the lower and upper halves of the canvas provide a chaotic background. The woman’s dress is green, and this colour is picked up in the bonnet of her hat, as is the yellow of her hair.',

    location: {
      latitude: 51.5076,
      longitude: -0.0993
    },
    user: seededUsers[0],
    artist: seededArtist
  },{
    title: 'Bowl of Fruit, Violin and Bottle',
    image: 'https://www.tate.org.uk/art/images/work/T/T05/T05010_10.jpg',
    date: '1914',
    info: 'This table-top scene, with its fruit-bowl, violin, bottle and (painted) newspaper, is constructed from areas of colour that resemble cut-out pieces of paper. The background has been left white. Picasso and Braque had been making collages that experimented with representation and reality since 1912. They soon began to simulate the appearance of collage materials in their oil paintings, sometimes adding sand to the paint to give a heightened reality to the picture surface.',
    wikiLink: 'https://en.wikipedia.org/wiki/The_Weeping_Woman',
    location: {
      latitude: 50.214722,
      longitude: -5.4825
    },
    user: seededUsers[1],
    artist: seededArtist
  },{
    title: 'Goat’s Skull, Bottle and Candle',
    image: 'https://www.tate.org.uk/art/images/work/T/T00/T00145_10.jpg',
    date: '1952',
    info: 'After the suffering of the Second World War, Picasso made a number of monochromatic works concerned with atrocities in the Korean War. He also painted four versions of this still-life subject, whose inspiration appears to have been the execution of the Communist partisan Nikos Beloyannis by the Greek government. The grey tones establish the sombre mood, while the candle and skull are traditional reminders of death. His willingness to take a moral stand reinforced Picasso\'s status as the most influential artist of his generation.',
    wikiLink: 'https://en.wikipedia.org/wiki/The_Weeping_Woman',
    location: {
      latitude: 53.4010,
      longitude: -2.9944
    },
    user: seededUsers[2],
    artist: seededArtist
  }))
  .then((paintings) => seededPaintings = paintings)
  .then(() => console.log(seededUsers, seededArtist, seededPaintings))

  .then(() => console.log('***** Database seeded! *****'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
