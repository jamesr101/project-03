const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' } // store the user by reference
});


const paintingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [1, 'Name must have at least 2 characters']
  },
  image: {
    type: String,
    required: [true, 'This field is required'],
    match: [/^https?:\/\/.+/, 'Image link must start with \'http\'']},
  date: Date,
  info: String,
  wikiLink: {
    type: String,
    match: [/^https?:\/\/.+/, 'Image link must start with \'http\'']},
  location: {
    latitude: Number,
    longitude: Number
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }, // store the user by reference
  comments: [ commentSchema ],
  likes: [ { type: mongoose.Schema.ObjectId, ref: 'User'} ],
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: 'Artist',
    required: [true, 'This field is required']
  }
});


module.exports = mongoose.model('Painting', paintingSchema);
