import express, { Express, Request, Response } from 'express';
import { Controller } from '../base-controller';

export class HealthcheckController extends Controller {
    register(server: Express): void {
        const router = express.Router();
        server.use('/healthcheck', router);

        router.get('/liveness', this.liveness);
        router.get('/readiness', this.readiness);
    }

    liveness(_req: Request, res: Response) {
        res.status(200).json({ ok: true });
    }

    readiness(_req: Request, res: Response) {
        res.status(200).json({ ok: true });
    }
}
