import jwt from "jsonwebtoken";
import { findUserById } from "../services/user/index.js";
 

/**
 * Middleware for user authentication using JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

export const auth = async (req, res, next) => {
 

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({"Unauthorized request"});
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decodedToken?.userId);

    if (!user) {
      return res.status(401).json({message: "Invalid Access Token"});
    }

    req.user = user?._id;
    next();
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
