const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String, required: [true, 'Username is required'], unique: true
  },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: true },
  artistFollowed: [{type: mongoose.Schema.ObjectId, ref: 'Artist'}]
});

userSchema.set('toJSON',{
  transform(doc, json) {
    delete json.password;
    return json;
  }
});


userSchema.plugin(require('mongoose-unique-validator'),{
  message: 'Error, expected {PATH} to be unique'
});

// this virtual will aggregate all the recipes of this user
userSchema.virtual('recipes', {
  localField: '_id',
  foreignField: 'user',
  ref: 'Recipe'
});

// set up a passwordConfirmation virtual, because we DO want the data
// but we DON'T want to store it in the database
userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    // store the passwordConfirmation on `this` for use later...
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

// PRE-SAVE LIFECYCLE HOOK - runs before record is saved to the database
userSchema.pre('save', function hashPassword(next) {
  // if the user's password is modified, hash the password using bcrypt
  // and 8 rounds of salt and set to the password field
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  // move on to the next step which is the SAVE stage
  next();
});

// custom method to validate a password against a user's hashed password
userSchema.methods.validatePassword = function validatePassword(password) {
  // `password` is the plain text password
  // `this.password` is the hashed password stored on the user record
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
