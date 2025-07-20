type ErrorDetails = {
    code: string;
    message: string;
    status?: number;
    details?: unknown;
}

export class ApplicationError extends Error {
    readonly status: number;
    readonly code: string;
    readonly details: unknown;

    constructor({ code, message, details, status }: ErrorDetails) {
        super(message || 'Application Error');
        this.code = code ?? 'ApplicationError';
        this.details = details || message || 'Internal Error';
        this.status = status || 500;
    }

    static from(err: unknown): ApplicationError {
        if (err instanceof ApplicationError) {
            return err;
        }
        if (err instanceof Error) {
            const message = err?.message;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const details = (err as any)?.details;
            let code = 'INTERNAL_ERROR';
            if (err && 'code' in err) {
                code = err?.code as string;
                if (code === 'UNMAPPED_ERROR') {
                    return ApplicationError.InternalError();
                }
                return new ApplicationError({ code, message, details });
            } else {
                return ApplicationError.InternalError();
            }
        }
        return ApplicationError.InternalError();
    }

    static InternalError(details?: unknown): ApplicationError {
        return new ApplicationError({
            code: 'INTERNAL_ERROR',
            message: 'Internal Error',
            status: 500,
            details: details,
        });
    }

    static BadRequest(details?: unknown): ApplicationError {
        return new ApplicationError({
            code: 'BAD_REQUEST',
            message: 'Bad Request',
            status: 400,
            details,
        });
    }

    static Unauthorized(details?: string): ApplicationError {
        return new ApplicationError({
            code: 'UNAUTHORIZED',
            message: 'Unauthorized Request',
            status: 401,
            details: details,
        });
    }

    static NotFound(details?: unknown): ApplicationError {
        return new ApplicationError({
            code: 'NOT_FOUND',
            message: 'Not Found',
            status: 404,
            details,
        });
    }

    static Conflict(details?: unknown): ApplicationError {
        return new ApplicationError({
            code: 'CONFLICT',
            message: 'Duplicate',
            status: 409,
            details,
        });
    }

    static Forbidden(details?: unknown): ApplicationError {
        return new ApplicationError({
            code: 'FORBIDDEN',
            message: 'Forbidden Request',
            status: 403,
            details,
        });
    }
}