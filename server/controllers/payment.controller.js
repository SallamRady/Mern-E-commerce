const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// const stripe = require("stripe");

module.exports.checkOut = async (req, res, next) => {
  try {
    const { amount, products, success_url, cancel_url } = req.body;
    return stripe.checkout.sessions
      .create({
        payment_method_types: ["card"],
        line_items: products.map((pro) => {
          return {
            // name: pro.name,
            // description: pro.description,
            // amount: pro.price * 100,
            // currency: "usd",
            quantity: pro.quantity,
            price_data: {
              currency: "usd",
              unit_amount: pro.price * 100,
              product_data: {
                name: pro.name,
                description: pro.description,
              },
            },
          };
        }),
        mode: "payment",
        success_url,
        cancel_url,
      })
      .then((session) => {
        let context = {
          pageTitle: "Checkout",
          products: products,
          totalSum: amount,
          sessionId: session.id,
        };
        return res.json(context);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
