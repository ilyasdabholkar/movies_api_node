const router = require("express").Router();
const CryptoJs = require("crypto-js");
const { validateRequest } = require("../validations/requestValidator");
const { CreateUserValidationSchema } = require("../validations/user");
const config = require("../config/config.json");
const User = require("../models/User");
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middleware/auth");

router.get("/:id",verifyTokenAndAuthorization, async (req, res) => {
    let id = req.params.id
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
});

router.get("/",verifyTokenAndAuthorization, async (req, res) => {
    const user = await User.find().select("-password");
    res.status(200).json(user);
});

router.post('/register', validateRequest(CreateUserValidationSchema), async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, config.ENCRYPTION_SECRET)
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;