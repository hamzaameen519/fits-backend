import { User } from "../models/index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

const trainee = async (req, res, next) => {
  console.log("req", req.user);
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (user.role === "trainee") {
      next();
    } else {
      //   return next(CustomErrorHandler.unAuthorized());
      res.status(401).json({ message: "only trainee can book a session" });
    }
  } catch (error) {
    return next(CustomErrorHandler.serverError());
  }
};

export default trainee;
