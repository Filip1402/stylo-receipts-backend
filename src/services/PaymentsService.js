const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const publishableKey = "pk_test_51OYt9KJFdGhTPPB09zQdYSEWqi9ZKmkxxPeheh9OTs22R0CCXLosuXGsp2Yp2pt28G33i8GoIezV3tUNmwydVevW005tgmc80X";
async function createPaymentSession(totalAmount) {
    try {
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2023-10-16'}
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'eur',
            customer: customer.id,
          });
          

        return {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: publishableKey
        };

    }catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    createPaymentSession
}