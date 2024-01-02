import express from "express";
import { ApiError } from "../../utils/ApiError.js";
import { findUserByEmail } from "../../services/user/index.js";
import generateToken from "../../services/auth/index.js";
import bcrpyt from "bcrypt";

const router = express.Router();

// TODO: develop the APIs and add the swagger documentation here using JSDoc syntax

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    const user = findUserByEmail(email);
    if (!user) throw new ApiError(404, "User doesn't exist");

    const isPasswordValid = await bcrpyt.compare(password, user?.password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

    //generate access Token
    const accessToken = generateToken(user?._id);

    return res
      .json({
        access_token: accessToken,
      })
      .status(200);
  } catch (error) {
    throw new ApiError(400, "ERRR in login");
  }
});

router.post("/register", (req, res) => {
  return res
    .json({
      access_token: "",
    })
    .status(200);
});

export default router;
