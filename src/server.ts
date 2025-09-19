import * as http from 'http';
import { Express, Handler } from 'express';
import { Controller } from './controllers/base-controller';
import { le } from './utilities/logger';
import helmet from 'helmet';
import cors from 'cors';

export class Server {
    public httpServer!: http.Server;

    constructor(
        private readonly env: string,
        private readonly host: string,
        private readonly port: number,
        private readonly expressInstance: Express,
        private readonly controllers: Controller[],
        private readonly middlewares?: Handler[],
    ) {
        try {
            const helmetjs = helmet();

            const corsOptions = {
                origin: ['https://karlroxas21.github.io'],
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
            }
            this.expressInstance.use(cors(corsOptions));
            this.expressInstance.use(helmetjs);
            this.middlewares?.forEach((m) => this.expressInstance.use(m));
            this.controllers?.forEach((c) => c.init(this.expressInstance));

            // this.expressInstance.use(ErrorMiddleware)

        } catch (error) {
            le('server won\'t start', { error });
            process.exit(1);
        }
    }

    start() {
        this.httpServer = this.expressInstance.listen(this.port, this.host);
    }

    stop() {
        this.httpServer?.close();
    }
}