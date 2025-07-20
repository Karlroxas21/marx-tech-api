// import { IncomingHttpHeaders } from "http";
import { li } from "../utilities/logger";
import { Request, Response, NextFunction } from 'express';
// import { body } from "express-validator";

// path list to be excluded in logger.
// const SKIP_PATHS: string[] = ['/healthcheck/liveness', '/healthcheck/readiness'];

// list of headers that will redact from the logs
// const SENSITIVE_HEADERS: string[] = ['client-secret', 'authorization'];

// list of content fields to be redact from logs
// const SENSITIVE_CONTENTS: string[] = ['line1', 'line2', 'password'];


// redact sensitive information from headers based on the sensitive header list.
// const filterIncomingHeaders = (headers: IncomingHttpHeaders): IncomingHttpHeaders => {
//     const headersCopy = Object.assign({}, headers);
//     for(const header in headersCopy) {
//         if (SENSITIVE_HEADERS.includes(header)) {
//             headersCopy[header] = '**redacted**';
//         }
//     }
//     return headersCopy;
// }

// logs all incoming request with exception of filtered sensitive info from header and req body.
// const logRequest = (req: Request) => {
//     const { method, url, headers, body } = req;
//     const filteredHeaders = filterIncomingHeaders(headers);
//     li('http request received', { method, url, headers: filteredHeaders, body: filterContent(body) });
// }

// temporary logger
export const requestLogger = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        li('http request received', {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body,
        });
        next();
    }

}