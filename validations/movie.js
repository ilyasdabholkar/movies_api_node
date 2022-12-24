const yup = require("yup");

const AddMovieRequestSchema = yup.object({
    body: yup.object({
        title: yup.string().min(5).max(255).required("title is a required field"),
        genreId: yup.string().required("genreId is a required field"),
        numberInStock: yup.number().min(0).max(255).required("numberInStock is a required field"),
        dailyRentalRate : yup.number().min(0).max(255).required("dailyRentalRate is a required field")
    })
});

module.exports = {
    AddMovieRequestSchema
}