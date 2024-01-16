const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const publishableKey = "pk_test_51OYt9KJFdGhTPPB09zQdYSEWqi9ZKmkxxPeheh9OTs22R0CCXLosuXGsp2Yp2pt28G33i8GoIezV3tUNmwydVevW005tgmc80X";
async function createPaymentSession(totalAmount) {

    /*
    products = [
        {name: "Patike 1", quantity: 2, priceInCents: 599},
        {name: "Patike 2", quantity: 1, priceInCents: 249},
        {name: "Patike 3", quantity: 5, priceInCents: 519},
    ]
    */

    try {
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2023-10-16'}
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1232,
            currency: 'eur',
            customer: customer.id,
            /*
            line_items: products.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.priceInCents,
            })),
            */
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