const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String, required: [true, 'Username is required'], unique: true
  },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: true },
  artistFollowed: [{type: mongoose.Schema.ObjectId, ref: 'Artist'}],
  trophies: [{type: mongoose.Schema.ObjectId, ref: 'Trophy'}],
  image: {
    type: String,
    default: 'https://image.flaticon.com/icons/svg/149/149071.svg', // FIXME: change to url of the our server
    match: [/^https?:\/\/.+/, 'Image link must start with \'http\'']
  }
});

userSchema.set('toJSON',{
  transform(doc, json) {
    delete json.password;
    return json;
  },
  virtuals: true
});


userSchema.plugin(require('mongoose-unique-validator'),{
  message: 'Error, expected {PATH} to be unique'
});

// this virtual will aggregate all the uploaded paintings of this user
userSchema.virtual('paintingsUploaded', {
  localField: '_id',
  foreignField: 'user',
  ref: 'Painting'
});


userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// PRE-VALIDATE LIFECYCLE HOOK - runs before validation
userSchema.pre('validate', function checkPasswordsMatch(next) {
  // if the password is modified and the password and passwordConfirmation
  // do not match, invalidate the passwordConfirmation field
  // this will prevent the user record from being saved
  // and throw an error at the VALIDATION stage
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }

  // move on to the next step which is the VALIDATION stage
  next();
});


userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  // move on to the next step which is the SAVE stage
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
