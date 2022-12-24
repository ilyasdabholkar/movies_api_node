const router = require("express").Router();
const { validateRequest } = require("../validations/requestValidator");
const { RentalRequestSchema } = require("../validations/rental");
const Rental = require("../models/Rental");
const Customer = require("../models/Customer");
const validateObjectId = require("../middleware/validateObjectId");
const Movie = require("../models/Movie");
const { verifyTokenAndAdmin, verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
    const rentals = await Rental.find()
        .select("-__v")
        .sort("-dateOut");
    res.status(200).json(rentals);
});

router.post("/", verifyToken, validateRequest(RentalRequestSchema), async (req, res) => {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movie.");

    if (movie.numberInStock === 0)
        return res.status(400).send("Movie not in stock.");

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        await rental.save();
        await Movie.findByIdAndUpdate(
            rental.movie._id,
            {
                $inc: { numberInStock: -1 }
            }
        );
        res.status(200).send(rental);
    } catch (ex) {
        res.status(500).send("Something failed.");
    }
});

router.get("/:id", verifyToken, validateObjectId, async (req, res) => {
    const rental = await Rental.findById(req.params.id).select("-__v");

    if (!rental)
        return res.status(404).send("The rental with the given ID was not found.");

    res.send(rental);
});

module.exports = router;