const router = require("express").Router();
const { validateRequest } = require("../validations/requestValidator");
const { RentalRequestSchema } = require("../validations/rental");
const Rental = require("../models/Rental");
const Movie = require("../models/Movie");
const { verifyTokenAndAdmin } = require("../middleware/auth");


router.post("/", verifyTokenAndAdmin, validateRequest(RentalRequestSchema), async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send("Rental not found.");

    if (rental.dateReturned)
        return res.status(400).send("Return already processed.");

    rental.return();
    await rental.save();

    
    await Movie.findByIdAndUpdate(
        rental.movie._id ,
        {
            $inc: { numberInStock: 1 }
        }
    );

    return res.send(rental);
});


module.exports = router;