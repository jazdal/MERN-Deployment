const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  fname: {
    type: String, 
    required: [true, "First name is required."]
  }, 
  lname: {
    type: String, 
    required: [true, "Last name is required."]
  }, 
  email: {
    type: String, 
    required: [true, "Email is required."], 
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), 
      message: "Please enter a valid email address format."
    }
  }, 
  password: {
    type: String, 
    required: [true, "Password is required."]
  }
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(val => this._confirmPassword = val)

UserSchema.pre('validate', function(next) {
  if(this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password.')
  }
  next();
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

module.exports = mongoose.model('User', UserSchema);