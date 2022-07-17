import CustomErrorHandler from "../../services/CustomErrorHandler";
const stripe = require("stripe")(
  "sk_test_51Ke1KTHjHBX7BsTL075YAHuruUm8Axbhg4pCx2ac7BzYGA12vk5tvAf2iUhG6qSgMIFAm1nslPxDRatuF96VRLcv00BUgmqIlW"
);
const usersController = {
  //create customers
  async store(req, res, next) {
    let documents;
    console.log("admin controller");
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return next(CustomErrorHandler.serverError());
      }
      documents = await stripe.customers.create({
        name: name,
        email: email,
        phone: phone,
      });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    console.log("users", documents);
    res.status(201).json(documents);
  },
  //get all customers
  async index(req, res, next) {
    let documents;
    console.log("admin controller");
    try {
      documents = await stripe.customers.list({});
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
  //update customer
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
  async destroy(req, res, next) {
    let documents;
    console.log("admin controller");
    try {
      documents = await stripe.customers.del(req.params.id);
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    console.log("user update", documents);
    res.status(201).json(documents);
  },
};

export default usersController;
