import express from "express";
import { ApiError } from "../../utils/ApiError.js";
import { findUserByEmail } from "../../services/user/index.js";

const router = express.Router();

// TODO: develop the APIs and add the swagger documentation here using JSDoc syntax

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    //user validation ( email, password)

    if (!email) throw new ApiError(400, "Email is required");

    const user = findUserByEmail(email);
    if (!user) throw new ApiError(404, "User doesn't exist");

    const isPasswordValid = user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

    //generate access Token
    const accessToken = user.generateAccessToken();

    return res
      .json({
        access_token: accessToken,
      })
      .status(200);
  } catch (error) {
    console.log("ERRR in login", error);
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
