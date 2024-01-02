import { userModel } from "../../db/models/user.js";
import { ApiError } from "../../utils/ApiError.js";

/**
 *
 * @param {string} email - to unique identifier of the user
 * @returns {Promise<userModel>} - to resolve to the find user
 * @throws {Error} - if error occured in finding user.
 */

export const findUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({
      email,
    });
    return user;
  } catch (error) {
    throw new ApiError(500, "Somethings went wrong in finding user");
  }
};

export const createUser = async (user) => {};

export const findUserById = async (id) => {};

export const updateUserById = async (id, propertiesToBeUpdated) => {};

// more, if required
