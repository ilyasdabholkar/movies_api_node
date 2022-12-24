const yup = require("yup");

const RentalRequestSchema = yup.object({
    body: yup.object({
        customerId: yup.string().required("customerId is a required field"),
        movieId: yup.string().required("movieId is a required field")
    })
});

module.exports = {
    RentalRequestSchema
}