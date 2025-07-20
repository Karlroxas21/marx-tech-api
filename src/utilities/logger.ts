import { createLogger, transports, format, Logger } from 'winston';

export const logger: Logger = createLogger({
    level: 'info',
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                format.json(),
                format.prettyPrint({ colorize: true }),
            ),
        })
    ]
});

export const li = (msg: string, details?: object): void => {
    logger.info(msg, { ...details });
};

export const le = (msg: string, err?: unknown, details?: object): void => {
    logger.error(msg, { error: err, ...details });
};

export const lw = (msg: string, details?: object): void => {
    logger.warn(msg, { ...details });
}

export const silent = (y: boolean) => {
    logger.transports.forEach((t) => (t.silent = y));
};
