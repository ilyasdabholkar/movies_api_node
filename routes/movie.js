const router = require("express").Router();
const { validateRequest } = require("../validations/requestValidator");
const { AddMovieRequestSchema } = require("../validations/movie");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require('mongoose');

router.get("/", verifyToken, async (req, res) => {
    const movies = await Movie.find()
        .select("-__v")
        .sort("name");
    res.status(200).json(movies);
});

router.post("/", verifyTokenAndAdmin, validateRequest(AddMovieRequestSchema), async (req, res) => {

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");
  
    const movie = new Movie({
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        publishDate: moment().toJSON()
      });
    
    await movie.save();
    res.status(201).json(movie);
});

router.get("/:id", verifyToken, validateObjectId, async (req, res) => {
    const movie = await Movie.findById(req.params.id).select("-__v");
    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");
    res.status(200).json(movie);
});

router.put("/:id", verifyTokenAndAdmin,validateObjectId, async (req, res) => {
    
    try{
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send("Invalid genre.");

        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
              title: req.body.title,
              genre: {
                _id: genre._id,
                name: genre.name
              },
              numberInStock: req.body.numberInStock,
              dailyRentalRate: req.body.dailyRentalRate
            },
            { new: true }
          );
        
          if (!movie)
            return res.status(404).send("The movie with the given ID was not found.");
        
          res.status(200).json(movie);
    }catch(exception){
        console.log(exception)
        return res.status(400).send("Invalid genreId.");
    }
  });

router.delete("/:id", verifyTokenAndAdmin, validateObjectId, async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");
    res.status(200).json(movie);
});

module.exports = router;
