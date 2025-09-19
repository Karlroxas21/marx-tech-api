import 'dotenv/config';

const {
    NODE_ENV,
    SERVER_MODE,
    SERVER_HOST,
    SERVER_PORT,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    NODEMAILER_USER,
    NODEMAILER_PASS,
    NODEMAILER_TO,
    ORIGIN,
} = process.env;

interface Config {
    server: {
        env: string;
        mode: string;
        host: string;
        port: number;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    nodemailer: {
        user: string;
        pass: string;
        to: string;
    },
    cors: {
        origin: string;
    }
}

const AppConfig: Config = {
    server: {
        env: NODE_ENV ?? 'development',
        mode: SERVER_MODE ?? 'sandbox',
        host: SERVER_HOST ?? '0.0.0.0',
        port: parseInt(SERVER_PORT ?? '3000', 10)
    },
    database: {
        host: DATABASE_HOST ?? 'localhost',
        port: parseInt(DATABASE_PORT ?? '5432', 10),
        username: DATABASE_USERNAME ?? '',
        password: DATABASE_PASSWORD ?? '',
        database: DATABASE_NAME ?? '',
    },
    nodemailer: {
        user: NODEMAILER_USER ?? '',
        pass: NODEMAILER_PASS ?? '',
        to: NODEMAILER_TO ?? '',
    },
    cors: {
        origin: ORIGIN ?? '',
    }
}

export const DatabaseUrl = (): string => {
    const { host, port, username, password, database } = AppConfig.database;
    return `postgres://${username}:${password}@${host}:${port}/${database}`;
};

export default AppConfig;