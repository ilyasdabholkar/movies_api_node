
const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
        });
        return next();
    } catch (err) {
        return res.status(400).json({ type: err.name, message: err.message });
    }
}

module.exports = {
    validateRequest
}