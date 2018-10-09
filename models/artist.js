const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [1, 'Name must have at least 2 characters']
  },
  image: {
    type: String,
    required: [true, 'This field is required']
  },
  dateBorn: String,
  dateDeath: String,
  info: String,
  wikiLink: {
    type: String,
    match: [/^https?:\/\/.+/, 'Image link must start with \'http\'']
  }
});

artistSchema.virtual('paintings', {
  ref: 'Painting',
  localField: '_id',
  foreignField: 'artist'
});

artistSchema.virtual('followers', {
  ref: 'User',
  localField: '_id',
  foreignField: 'artistFollowed'
});

artistSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('Artist', artistSchema);
