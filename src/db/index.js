const mongoose = require('mongoose');

mongoose.connect('<YOUR_MONGO_URL>');
mongoose.Promise = global.Promise;

module.exports = mongoose;
