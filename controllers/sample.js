import express from "express"
import { sampleService } from "../services/sample.js";

const router = express.Router();

router.get("/", (req, res) => {
    const result = sampleService("Hello this is a sample service")
    return res.json({result}).status(200)
})

export default router