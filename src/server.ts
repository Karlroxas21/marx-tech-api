import * as http from 'http';
import { Express, Handler } from 'express';
import { Controller } from './controllers/base-controller';
import cors from 'cors';
import { le } from './utilities/logger';

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
            const corsMiddleware = cors({
                origin: '*', 
            });
            this.expressInstance.use(corsMiddleware);
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