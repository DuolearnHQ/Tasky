import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 *
 * @param {string} password - to check the user password
 * @returns {Promise<boolean>} - promise to resolve true or false
 */

schema.methods.isPasswordCorrect = async (password) => {
  return await bcrypt.compare(password, this.password);
};

/**
 *
 *
 * @returns {Promise<string>} - promise that resolve to the generated access token (jwt)
 */
schema.methods.generateAccessToken = () => {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
};

export const userModel = mongoose.model("User", schema);
