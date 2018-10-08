const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['FindPainting', 'Info']
  },
  title: String,
  content: String,
  painting: { type: mongoose.Schema.ObjectId, ref: 'Painting' },
  order: {
    type: Number,
    required: [true, 'This field is required'],
    min: [0, 'the minimal numbder is 0']
  }
});


const journeySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'This field is required'],
    minlength: [1, 'Name must have at least 2 characters']
  },
  image: {
    type: String,
    match: [/^https?:\/\/.+/, 'Image link must start with \'http\'']},
  info: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }, // store the user by reference
  // likes: [ { type: mongoose.Schema.ObjectId, ref: 'User'} ],
  tasks: [ tasksSchema ],
  trophyWin: {
    type: mongoose.Schema.ObjectId,
    ref: 'Trophy'
  }
});


module.exports = mongoose.model('Journey', journeySchema);
