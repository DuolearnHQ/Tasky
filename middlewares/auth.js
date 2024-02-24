import jwt from "jsonwebtoken";
import { findUserById } from "../services/user/index.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Middleware for user authentication using JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

export const auth = async (req, res, next) => {
  // TODO: implement the auth middleware here

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decodedToken?.userId);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};
