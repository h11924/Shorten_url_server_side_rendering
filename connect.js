const mongoose = require("mongoose");

// This syntax is used to create an asynchronous function to handle database connection
async function connectToMongoDB(url) {
  // mongoose.connect returns a promise, so we return it here to handle it in index.js
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};