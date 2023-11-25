import dotenv from "dotenv"
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectToDB } from "./db/conn.js";
import sampleRoute from "@/controllers/sample.js"

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/sample", sampleRoute)

app.get('/health', (req, res) => {
    return res.json({
        status: 'Healthy',
        host: req.hostname
    }).status(200);
});

app.listen(process.env.PORT, () => {
    connectToDB()
        .then(() => {
            const textGreenColor = '\x1b[32m%s\x1b[0m'
            console.log(textGreenColor, `[INFO] App running on port ${process.env.PORT}`)
            return;
        })
        .catch(() => {
            const textRedColor = '\x1b[31m%s\x1b[0m'
            console.error(textRedColor, `[ERROR] Failed to start the server, due to DB connection issues!`)
            return;
        })
    
});
