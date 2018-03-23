const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:Gr6hhhmYVKjH@ds213229.mlab.com:13229/node-first-api');
mongoose.Promise = global.Promise;

module.exports = mongoose;
