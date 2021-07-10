const { DB_MONGODB_URI } = require('../config/env');
const mongoose = require('mongoose');


module.exports = async () => {
  try {
    mongoose.connect(DB_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo Connected');
  } catch(err) {
    console.log(err);
  }
}
