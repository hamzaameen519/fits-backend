import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { HTTP_STATUS, ROLE_TYPES } from "../utils/constants.js";
import { errorResponse } from "../utils/response.js";

const role = async (req, res, next) => {
  console.log("req", req.user);
  try {
    if (
      req.body.role === ROLE_TYPES.TRAINER ||
      req.body.role === ROLE_TYPES.TRAINEE
    ) {
      next();
    } else {
      return errorResponse(
        res,
        HTTP_STATUS.NOT_ACCEPTABLE,
        "This Role Type Is Not Allowed!"
      );
    }
  } catch (error) {
    // return next(CustomErrorHandler.serverError());
    return next(error);
  }
};

export default role;
