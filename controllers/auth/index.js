import express from "express";
import { ApiError } from "../../utils/ApiError.js";
import { findUserByEmail } from "../../services/user/index.js";
import bcrpyt from "bcrypt";
import { createUser } from "../../services/user/index.js";
import { createToken } from "../../services/jwt/index.js";
import * as z from "zod";
 

const router = express.Router();

// TODO: develop the APIs and add the swagger documentation here using JSDoc syntax

const registerBodyPayload = z.object({
    fullname: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});



/**
 * @swagger
 * swagger: "2.0"
 * tags:
 *   - name: "Users"
 *     description: "User management and login"
 * paths:
 *   /auth/register:
 *     post:
 *       summary: "Create a new user"
 *       description: "Registers a new user in the system."
 *       tags:
 *         - "Users"
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: user
 *           description: "the user to create"
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *             properties:
 *               fullname:
 *                 type: "string"
 *                 description: "The user's full name"
 *               email:
 *                 type: "string"
 *                 description: "The user's email address"
 *               password:
 *                 type: "string"
 *                 description: "The user's password"
 *       responses:
 *         200:
 *           description: "User created successfully"
 *           content:
 *             application/json:
 *               schema:
 *                 type: "object"
 *                 properties:
 *                   token:
 *                     type: "string"
 *                     description: "Authentication token for the user"
 *         400:
 *           description: "Invalid input"
 *           content:
 *             application/json:
 *               schema:
 *                 type: "object"
 *                 properties:
 *                   message:
 *                      type: "string"
 *                      description: "Error message detailing what went wrong"
 *         500:
 *            description: "Internal server error"
 */

router.post("/register", async (req, res) => {
    const { email, password, fullname } = req.body;

    const validationResult = registerBodyPayload.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.issues });
    }

    try {
        const userId = await createUser(email, fullname, password);
        const token = await createToken(userId);
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});




/**
 * @swagger
 * swagger: "2.0"
 * tags:
 *   - name: "Users"
 *     description: "User management and login"
 * paths:
 *   /auth/login:
 *     post:
 *       summary: "Login user"
 *       description: "Login a  user in the system."
 *       tags:
 *         - "Users"
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: user
 *           description: "the user to create"
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: "string"
 *                 description: "The user's email address"
 *               password:
 *                 type: "string"
 *                 description: "The user's password"
 *       responses:
 *         200:
 *           description: "Login successfully"
 *           content:
 *             application/json:
 *               schema:
 *                 type: "object"
 *                 properties:
 *                   token:
 *                     type: "string"
 *                     description: "Authentication token for the user"
 *         400:
 *           description: "Invalid input"
 *           content:
 *             application/json:
 *               schema:
 *                 type: "object"
 *                 properties:
 *                   message:
 *                      type: "string"
 *                      description: "Error message detailing what went wrong"
 *         500:
 *            description: "Internal server error"
 */
 

router.post("/login", async (req, res) => {
  try {
   
    const { email, password } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    const user = await findUserByEmail(email);
 
    if (!user) throw new ApiError(404, "User doesn't exist");

    const isPasswordValid = await bcrpyt.compare(password, user?.password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

    //generate access Token
    const accessToken = await createToken(user?._id);
 

     return res
      .json({
        access_token: accessToken,
      })
      .status(200);
  } catch (error) {
 
    throw new ApiError(400, "ERRR in login");
  }
});



export default router;
