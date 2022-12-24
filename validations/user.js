const yup = require("yup");

const CreateUserValidationSchema = yup.object({
    body: yup.object({
        name: yup.string().min(2).max(50).required(),
        email: yup.string().min(5).max(255).required(),
        password: yup.string().min(5).max(255).required(),
    })
});

const LoginUserRequestSchema = yup.object({
    body: yup.object({
        email: yup.string().min(5).max(255).required(),
        password: yup.string().min(5).max(255).required(),
    })
});

module.exports = {
    CreateUserValidationSchema,
    LoginUserRequestSchema
}