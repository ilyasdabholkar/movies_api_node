const router = require("express").Router();
const { validateRequest } = require("../validations/requestValidator");
const { AddGenreRequestSchema } = require("../validations/genre");
const Genre = require("../models/Genre");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", verifyToken, async (req, res) => {
    const genres = await Genre.find()
        .select("-__v")
        .sort("name");
    res.status(200).json(genres);
});

router.post("/", verifyTokenAndAdmin, validateRequest(AddGenreRequestSchema), async (req, res) => {
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.status(201).json(genre);
});

router.get("/:id", verifyToken, validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id).select("-__v");
    if (!genre)
        return res.status(404).send("The genre with the given ID was not found.");
    res.status(200).json(genre);
});

router.put("/:id",verifyTokenAndAdmin,validateObjectId, async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        {
            new: true
        }
    );
    if (!genre)
        return res.status(404).send("The genre with the given ID was not found.");
    res.status(200).json(genre);
});

router.delete("/:id", verifyTokenAndAdmin, validateObjectId, async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
        return res.status(404).send("The genre with the given ID was not found.");
    res.status(200).json(genre);
});

module.exports = router;
