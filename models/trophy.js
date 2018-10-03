const mongoose = require('mongoose');

const trophySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [2, 'Name must have at least 2 characters']
  },
  image: {
    type: String,
    required: [true, 'This field is required'],
    match: [/^https?:\/\/.+/, 'Image link must start with \'http\'']},
  description: String,
  requirements: { String }
});


module.exports = mongoose.model('Trophy', trophySchema);
