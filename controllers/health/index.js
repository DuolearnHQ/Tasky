import express from "express"

const router = express.Router();


/**
 * @swagger
 * /health:
 *  get:
 *    description: Use to request the health of the API
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", (req, res) => {
    return res.json({
        status: 'Healthy',
        host: req.hostname
    }).status(200);
})

export default router