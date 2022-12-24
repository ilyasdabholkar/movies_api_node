const yup = require("yup");

const AddCustomerRequestSchema = yup.object({
    body: yup.object({
        name: yup.string().min(5).max(255).required(),
        phone : yup.string().min(5).max(255).required(),
        isGold : yup.boolean().required()
    })
});

module.exports = {
    AddCustomerRequestSchema
}