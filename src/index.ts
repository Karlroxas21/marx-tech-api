import dotenv from 'dotenv';
import winston from 'winston';
import { li } from './utilities/logger';
import { createServer } from './wire';

function useDotEnv() {
    dotenv.config();
};

function logger() {
    winston.createLogger({
        level: process.env.LOG_LEVEL || "info",
        format: winston.format.json(),
        transports: [new winston.transports.Console()],
    })
}

async function main() {
    useDotEnv();
    logger();
    const server = await createServer();
    server.start();
    li("server started");
}

main();