const { model, Schema } = require('mongoose');


const userSchema = new Schema({
  email: String,
  password: String,
  rol: String,
});

const User = model('User', userSchema);
module.exports = { User }
