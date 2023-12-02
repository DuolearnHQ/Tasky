import express from "express"

const router = express.Router();

// TODO: develop the APIs and add the swagger documentation here using JSDoc syntax

router.get("/", (req, res) => {
    return res.json({}).status(200);
})

router.get("/:id", (req, res) => {
    return res.json({}).status(200);
})

router.post("/", (req, res) => {
    return res.json({}).status(200);
})

router.put("/:id", (req, res) => {
    return res.json({}).status(200);
})

router.delete("/:id", (req, res) => {
    return res.json({}).status(200);
})

export default router