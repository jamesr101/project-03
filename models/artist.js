const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [2, 'Name must have at least 2 characters']
  },
  image: {
    type: String,
    required: [true, 'This field is required'],
    match: [/^https?:\/\/.+/, 'Image link must start with \'http\'']},
  dateBorn: Date,
  dateDied: Date,
  info: String,
  wikiLink: {
    type: String,
    match: [/^https?:\/\/.+/, 'Imaage link must start with \'http\'']
  },
  tags: [ String ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Recipe', paintingSchema);
