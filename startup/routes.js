const express = require('express');
const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/user");
const genreRoutes = require("../routes/genre");
const movieRoutes = require("../routes/movie");
const customerRoutes = require("../routes/customer");
const rentalRoutes = require("../routes/rental");
const returnRoutes = require("../routes/returns");

module.exports = function(app) {
  app.use('/api/genres', genreRoutes);
  app.use('/api/customers', customerRoutes);
  app.use('/api/movies',movieRoutes);
  app.use('/api/rentals', rentalRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/auth',authRoutes);
  app.use('/api/returns', returnRoutes);
}