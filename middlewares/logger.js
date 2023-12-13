import winston from "winston";
const { combine, timestamp, json, cli } = winston.format;

export const winstonLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(cli(), timestamp(), json(),),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});

export const logger = (req, res, next) => {
    // Log information about the incoming request
    winstonLogger.info({
        message: 'Incoming Request',
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date(),
    });

    // Capture the start time of the request for response time calculation
    const startTime = new Date();

    // Log information after the response is sent
    res.on('finish', () => {
        const endTime = new Date();
        const responseTime = endTime - startTime;

        winstonLogger.info({
            message: 'Outgoing Response',
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime,
            timestamp: new Date(),
        });
    });

    next();
};
