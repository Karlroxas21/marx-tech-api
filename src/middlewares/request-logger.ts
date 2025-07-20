import { IncomingHttpHeaders } from "http";
import { li } from "../utilities/logger";
import { Request, Response, NextFunction, Send } from 'express';

// path list to be excluded in logger.
// const SKIP_PATHS: string[] = ['/healthcheck/liveness', '/healthcheck/readiness'];

// list of headers that will redact from the logs
const SENSITIVE_HEADERS: string[] = ['client-secret', 'authorization'];

// list of content fields to be redact from logs
// const SENSITIVE_CONTENTS: string[] = ['line1', 'line2', 'password'];

const SENSITIVE_PATTERNS: RegExp[] = [
    // email
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
    // mobile number
    /^\+[1-9]\d{1,14}$/g,
];

const filterContent = (body?: unknown): unknown => {
    if (!body || typeof body === 'boolean' || typeof body === 'number') {
        return body;
    }
    if (typeof body === 'string') {
        try {
            const jsonBody = JSON.parse(body);
            return filterObject(jsonBody);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
            let filteredString = body;
            SENSITIVE_PATTERNS.forEach((content) => {
                filteredString = filteredString.replace(content, '**redacted**');
            });
            return filteredString;
        }
    }
    if (typeof body === 'object') {
        return filterObject(body);
    }
    return body;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterObject = (obj: Record<string, any>): Record<string, any> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const redactedObject: Record<string, any> = { ...obj };
    // traverse through the objects
    for (const key in redactedObject) {
        // if the key is sensitive, redact it
        const value = obj[key as keyof typeof obj];

        if (typeof value === 'object' && value !== null) {
            // object, recurse
            redactedObject[key as keyof typeof redactedObject] = filterObject(value);
        } else {
            // non-object, filter content
            redactedObject[key as keyof typeof redactedObject] = filterContent(value);
        }
    }
    return redactedObject;
};

// redact sensitive information from headers based on the sensitive header list.
const filterIncomingHeaders = (headers: IncomingHttpHeaders): IncomingHttpHeaders => {
    const headersCopy = Object.assign({}, headers);
    for(const header in headersCopy) {
        if (SENSITIVE_HEADERS.includes(header)) {
            headersCopy[header] = '**redacted**';
        }
    }
    return headersCopy;
}

const sendInterceptor = (res: Response, send: Send) => (content?: unknown) => {
    res.locals.body = filterContent(content);
    res.send = send;
    res.send(content);
    return res;
};

// logs all incoming request with exception of filtered sensitive info from header and req body.
const logRequest = (req: Request) => {
    const { method, url, headers, body } = req;
    const filteredHeaders = filterIncomingHeaders(headers);
    li('http request received', { method, url, headers: filteredHeaders, body: filterContent(body) });
}

const logResponse = (res: Response) => {
    // intercept the send function
    res.send = sendInterceptor(res, res.send);
    // only log on finish so all response details are available.
    res.on('finish', () => {
        const status = res.statusCode;
        const body = res.locals.body;
        li('http request completed', { status, body });
    });
};

// temporary logger
export const requestLogger = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.path) {
            logRequest(req);
            logResponse(res);
        }
        next();
    }

}