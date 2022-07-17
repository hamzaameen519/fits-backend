import CustomErrorHandler from "../../services/CustomErrorHandler";
const stripe = require("stripe")(
  "sk_test_51Ke1KTHjHBX7BsTL075YAHuruUm8Axbhg4pCx2ac7BzYGA12vk5tvAf2iUhG6qSgMIFAm1nslPxDRatuF96VRLcv00BUgmqIlW"
);
const cardController = {
  //create customers card
  async store(req, res, next) {
    const { card_number, exp_month, exp_year, cvc } = req.body;
    let documents;
    try {
      if (!card_number || !exp_month || !exp_year || !cvc) {
        const { error } = cardSchema.validate(req.body);
        res.status(500).json(error);
      }
      documents = await stripe.tokens
        .create({
          card: {
            number: parseInt(card_number),
            exp_month: parseInt(exp_month),
            exp_year: parseInt(exp_year),
            cvc: parseInt(cvc),
          },
        })
        .then(async (res) => {
          //   console.log("res", res);
          const card = await stripe.customers.createSource(req.params.id, {
            source: res.id,
          });
          console.log("card.........", card);
        });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    console.log("users", documents);
    res.status(201).json(documents);
  },
  //get all customers cards
  //   async index(req, res, next) {
  //     let documents;
  //     console.log("admin controller");
  //     try {
  //       documents = await stripe.customers.list({});
  //     } catch (err) {
  //       return next(CustomErrorHandler.serverError());
  //     }
  //     console.log("users", documents);
  //     res.status(201).json(documents);
  //   },
  //get particular customer card
  async show(req, res, next) {
    let documents;

    console.log("hello", req.params.id);
    try {
      if (req.params.id && req.body.card_id) {
        documents = await stripe.customers.retrieveSource(
          req.params.id,
          req.body.card_id
        );
      } else {
        return next(CustomErrorHandler.emptyState());
      }
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    console.log("users", documents);
    res.status(201).json(documents);
  },
  //update card data
  async update(req, res, next) {
    //card not update because we are not live mode
    let documents;
    const { card_id, address_city } = req.body;
    try {
      documents = await stripe.customers.updateSource(req.params.id, card_id, {
        address_city: address_city,
      });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    console.log("user update", documents);
    res.status(201).json(documents);
  },
  //delete card
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

export default cardController;
