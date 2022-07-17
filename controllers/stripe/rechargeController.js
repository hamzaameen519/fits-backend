import CustomErrorHandler from "../../services/CustomErrorHandler";
const stripe = require("stripe")(
  "sk_test_51Ke1KTHjHBX7BsTL075YAHuruUm8Axbhg4pCx2ac7BzYGA12vk5tvAf2iUhG6qSgMIFAm1nslPxDRatuF96VRLcv00BUgmqIlW"
);
const rechargeController = {
  //create customers
  async store(req, res, next) {
    let documents;
    console.log("admin controller");
    const { amount, currency, source, description } = req.body;
    try {
      if (!amount || !currency || !source || !description) {
        res.status(500).json("Please add all requirements");
      }
      documents = await stripe.charges.create({
        amount: amount,
        currency: currency,
        // source: source,
        source: "source",
        description: description,
      });
      res.status(200).json(charge);
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    console.log("users", documents);
    res.status(201).json(documents);
  },

  //get particular customer
  async show(req, res, next) {
    let documents;
    console.log("hello", req.params.id);
    try {
      if (req.params.id) {
        documents = await stripe.customers.retrieve(req.params.id);
      } else {
        return next(CustomErrorHandler.emptyState());
      }
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    console.log("users", documents);
    res.status(201).json(documents);
  },
  async update(req, res, next) {
    let documents;
    console.log("admin controller");
    try {
      documents = await stripe.customers.update(req.params.id, {
        balance: req.body.balance,
      });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    console.log("user update", documents);
    res.status(201).json(documents);
  },
};

export default rechargeController;
