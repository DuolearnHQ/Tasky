import express from "express"
import { createUser } from "../../services/user/index.js"
import { createToken } from "../../services/jwt/index.js";
import * as z from "zod";

const router = express.Router();

// TODO: develop the APIs and add the swagger documentation here using JSDoc syntax

const registerBodyPayload = z.object({
    fullname: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

router.post("/login", (req, res) => {
    return res.json({
        access_token: '',
    }).status(200);
})

/**
 * @swagger
 * swagger: "2.0"
 * tags:
 *   - name: "Users"
 *     description: "User management and login"
 * paths:
 *   /register:
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

export default router
