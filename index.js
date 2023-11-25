import dotenv from "dotenv"
dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/health', (req, res) => {
    return res.json({
        status: 'Healthy',
        host: req.hostname
    }).status(200);
});

app.listen(process.env.PORT, () => {
    console.log(`[INFO] App running on port ${process.env.PORT}`);
});
