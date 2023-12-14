import express from "express"
import { createUser } from "../../services/user/index.js"
import { createToken } from "../../services/jwt/index.js";
import * as z from "zod";

const router = express.Router();

// TODO: develop the APIs and add the swagger documentation here using JSDoc syntax

const userSchema = z.object({
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
 * /register:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *               email:
 *                 type: string
 *                 description: The user's email.  
 *                 example: leanne@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password
 *     summary: Create a new user.
 *     description: Create a new user.
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - fullname
 *             - email
 *             - password
 *           properties:
 *             fullname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string 
 *     responses:
 *       200: 
 *         description: A JSONPlaceholder user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullname:
 *                   type: string
 *                   description: The user's name.
 *                   example: Leanne Graham
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: leanne@example.com   
 *                 password:
 *                   type: string
 *                   description: The user's password.
 *                   example: password  
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Internal server error.
 *       default:
 *         description: Unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: Unexpected error.
*/


router.post("/register", async (req, res) => {
    const { email, password, fullname } = req.body;

    const validationResult = userSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.issues });
    }

    try {
        const userId = await createUser(email, fullname, password);
        const token = await createToken(userId, process.env.SECRET);
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

export default router