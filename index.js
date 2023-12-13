import dotenv from "dotenv"
dotenv.config();

import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// DB
import { connectToDB } from "./db/conn.js";

// CONTROLLERS
import healthRoute from "./controllers/health/index.js"
import authRoute from "./controllers/auth/index.js"
import projectRoute from "./controllers/project/index.js"
import userRoute from "./controllers/user/index.js"
import taskRoute from "./controllers/task/index.js"
import { createUser } from "./services/user/index.js";

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Tasky - Task Management API",
            description: "Tasky API Documentation",
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["index.js", "./controllers/**/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// TODO: add middleware to all these routes
app.use('/health', healthRoute);
app.use('/auth', authRoute);
app.use('/project', projectRoute);
app.use('/user', userRoute);
app.use('/task', taskRoute);

app.listen(process.env.PORT, () => {
    connectToDB()
        .then(() => {
            const textGreenColor = '\x1b[32m%s\x1b[0m'
            console.log(textGreenColor, `[INFO] App running on port ${process.env.PORT}`)
        })
        .catch(() => {
            const textRedColor = '\x1b[31m%s\x1b[0m'
            console.error(textRedColor, `[ERROR] Failed to start the server, due to DB connection issues!`)
        })
});
