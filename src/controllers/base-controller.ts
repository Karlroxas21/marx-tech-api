import { Express } from 'express';
import { li } from '../utilities/logger';

export abstract class Controller {
    init(server: Express) {
        this.register(server);
        li('controller registered', { controller: this.constructor.name });
    }

    abstract register(server: Express): void;
}