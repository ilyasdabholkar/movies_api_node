const router = require("express").Router();
const { validateRequest } = require("../validations/requestValidator");
const { AddCustomerRequestSchema } = require("../validations/customer");
const Customer = require("../models/Customer");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", verifyToken, async (req, res) => {
    const customers = await Customer.find()
        .select("-__v")
        .sort("name");
    res.send(customers);
});

router.post("/", verifyTokenAndAdmin, validateRequest(AddCustomerRequestSchema), async (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.status(201).json(customer);
});

router.get("/:id", verifyToken, validateObjectId, async (req, res) => {
    const customer = await Customer.findById(req.params.id).select("-__v");

    if (!customer)
        return res
            .status(404)
            .send("The customer with the given ID was not found.");

    res.status(200).json(customer);
});

router.put("/:id", verifyTokenAndAdmin, validateObjectId, validateRequest(AddCustomerRequestSchema), async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        },
        { new: true }
    );

    if (!customer)
        return res
            .status(404)
            .send("The customer with the given ID was not found.");

    res.status(200).json(customer);
});

router.delete("/:id", verifyTokenAndAdmin, validateObjectId, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
        return res
            .status(404)
            .send("The customer with the given ID was not found.");
    res.status(200).json(customer);
});

module.exports = router;
