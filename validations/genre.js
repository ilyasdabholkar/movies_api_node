const yup = require("yup");

const AddGenreRequestSchema = yup.object({
    body: yup.object({
        name: yup.string().min(5).max(50).required(),
    })
});

module.exports = {
    AddGenreRequestSchema
}