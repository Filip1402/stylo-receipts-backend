var express = require("express");
var router = express.Router();
const controller = require("../controllers/PaymentsController");

router.get("/mobile/create", function (req, res, next) {
    controller.createPayment(req, res);
})

module.exports = router;