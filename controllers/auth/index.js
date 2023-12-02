import express from "express"

const router = express.Router();

// TODO: develop the APIs and add the swagger documentation here using JSDoc syntax

router.post("/login", (req, res) => {

    return res.json({
        access_token: '',
    }).status(200);
})

router.post("/register", (req, res) => {

    return res.json({
        access_token: '',
    }).status(200);
})

export default router