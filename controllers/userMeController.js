import {
  Fitness,
  Personal,
  Profession,
  Review,
  Service,
  Session,
  User,
} from "../models";
// import profileSchema from "../validators/profileSchema";

const userMeController = {
  // get
  async show(req, res, next) {
    let documents,
      userPersonal,
      userProfession,
      user,
      userReview,
      userFitness,
      userServices,
      success,
      message = "",
      statusCode,
      userSession;
    try {
      user = await User.findById({ _id: req.params.userId }).select(
        "-password -__v -updatedAt"
      );
      if (user) {
        success = true;
        statusCode = 201;
        userPersonal = await Personal.find({ user: req.params.userId }).select(
          "-__v -updatedAt"
        );
        userProfession = await Profession.find({
          user: req.params.userId,
        }).select("-__v -updatedAt");

        userReview = await Review.find({ user: req.params.userId }).select(
          "-__v -updatedAt"
        );
        userFitness = await Fitness.find({ user: req.params.userId }).select(
          "-__v -updatedAt"
        );
        userServices = await Service.find({ user: req.params.userId }).select(
          "-__v -updatedAt"
        );
        userSession = await Session.find({ user: req.params.userId }).select(
          "-__v -updatedAt"
        );
      } else {
        message = "Not Found";
        success = false;
        statusCode = 404;
      }

      documents = {
        statusCode,
        success,
        message,
        personal_info: userPersonal,
        profession_info: userProfession,
        user: user,
        review: userReview,
        fitness: userFitness,
        services: userServices,
        session: userSession,
      };
    } catch (err) {
      return next(err);
    }

    res.status(statusCode).json(documents);
  },
};

export default userMeController;
