const router = require("express").Router();
const CryptoJs = require("crypto-js");
const Jwt = require("jsonwebtoken");
const { validateRequest } = require("../validations/requestValidator");
const { LoginUserRequestSchema } = require("../validations/user");
const config = require("../config/config.json");
const User = require("../models/User");

router.post('/login',validateRequest(LoginUserRequestSchema), async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json("No User Found")
        }else {
            const hashedPassword = CryptoJs.AES.decrypt(user.password, config.ENCRYPTION_SECRET);
            const dbPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
            if (dbPassword == req.body.password) {

                const accessToken = Jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin != null || undefined && user.isAdmin == true ? true : false,
                }, 
                config.JWT_SECRET, 
                { expiresIn: "3d" });

                //add accessToken to response body
                const {password, ...others } = user._doc;
                res.status(200).json({...others,accessToken});
            } else {
                res.status(401).json("Wrong Credentials");
            }
        }
    }catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;
