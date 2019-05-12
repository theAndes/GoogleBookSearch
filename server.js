const express = require('express');

const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Googlereadinglist';
mongoose.connect(MONGODB_URI, function (error) {
  // Check error in initial connection. There is no 2nd param to the callback.
  if (error) return error;
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
