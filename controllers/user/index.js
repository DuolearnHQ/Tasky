import express from "express"

const router = express.Router();

// TODO: develop the APIs and add the swagger documentation here using JSDoc syntax

router.post("/me", (req, res) => {

    return res.json({}).status(200);
})

router.put("/update", (req, res) => {

    return res.json({}).status(200);
})

export default router