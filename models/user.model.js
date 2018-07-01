const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'manager'], required: true, default: 'user' }
});

//encrpyt a password
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 10, null);
}

//Check to see if password is a valid hash
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

//Hash password if it's been changed
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    console.log('password changed');
    this.password = this.generateHash(this.password);
  }
  next();
});

//export the model
module.exports = mongoose.model('User', userSchema);