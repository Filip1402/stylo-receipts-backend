const service = require("../services/PaymentsService");

async function createPayment(req, res) {
    try {
        const totalPaymentAmount = req.query.totalAmount;
        const stripeIntent = await service.createPaymentSession(totalPaymentAmount);
        console.log(stripeIntent);
        return res.status(200).json(stripeIntent)
    }catch (err) {
        res.status(500).json({error: "Server error"});
    }
}

module.exports = {
    createPayment
};