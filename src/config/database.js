const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/bulgarian-figures';

exports.initializeDatabase = ()=>mongoose.connect(connectionString);


