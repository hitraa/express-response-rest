import { Response } from 'express';

/**
 * Shared response options for success and error responses.
 */
export interface ResponseOptions {
  message?: string;
  data?: any;
  meta?: any;
  errors?: any;
  headers?: Record<string, string>;
  statusCode?: number;
}

/**
 * Response options for success responses.
 */
export interface SuccessResponseOptions extends ResponseOptions {
    message?: string;
    data?: any;
    meta?: any;
    headers?: Record<string, string>;
    statusCode?: number;
}

/**
 * Response options for error responses.
 */
export interface ErrorResponseOptions extends ResponseOptions {
    message?: string;
    errors?: any;
    headers?: Record<string, string>;
    statusCode?: number;
}

export type ResponseStatus = 'success' | 'error';

/**
 * A utility class to send consistent JSON responses in Express.
 */
export class HttpResponse {

	res: Response;

	constructor(res: Response) {
		this.res = res;
	}
    /**
     * Generic response method used by other response types.
     * Use this if you want full control over response shape and status code.
     *
     * @param status - Response type
     * @param options - Optional data, meta, errors, headers, and custom status code
     */
    send(
        status: ResponseStatus,
        options: SuccessResponseOptions|ErrorResponseOptions = {}
    ): void {
        const {
            message = status === 'success' ? 'Success' : 'Error',
            data,
            meta,
            errors,
            headers,
            statusCode = status === 'success' ? 200 : 500,
        } = options;

        if (headers) {
            for (const [key, value] of Object.entries(headers)) {
                this.res.setHeader(key, value);
            }
        }

        const response: Record<string, any> = {
            status,
            message
        };

        if (data !== undefined) response.data = data;
        if (errors !== undefined) response.errors = errors;
        if (meta !== undefined) response.meta = meta;

        response.timestamp = new Date().toISOString();

        this.res.status(statusCode).json(response);
    }

    /**
     * Sends a 200 OK success response.
     * Use for standard successful operations with optional data and metadata.
     *
     * @param options - Optional data, message, meta, and headers
     */
    success(options: SuccessResponseOptions = {}): void {
        this.send('success', { statusCode: 200, ...options });
    }

    /**
     * Sends a 201 Created response.
     * Use after a resource has been successfully created.
     *
     * @param res - Express response object
     * @param options - Optional data and message
     */
    created(options: SuccessResponseOptions = {}): void {
        this.success({ statusCode: 201, message: 'Resource created', ...options });
    }

    /**
     * Sends a 202 Accepted response.
     * Use when the request is accepted for processing, but not yet completed.
     *
     * @param res - Express response object
     * @param options - Optional message and meta
     */
    accepted(options: SuccessResponseOptions = {}): void {
        this.success({ statusCode: 202, message: 'Accepted', ...options });
    }

    /**
     * Sends a 204 No Content response.
     * Use when a request succeeds but returns no body.
     *
     */
    noContent(): void {
        this.res.status(204).send();
    }

    /**
     * Sends a 400 Bad Request response.
     * Use when the client sends invalid input or malformed data.
     *
     * @param options - Optional message and validation errors
     */
    badRequest(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 400, message: 'Bad Request', ...options });
    }

    /**
     * Sends a 401 Unauthorized response.
     * Use when the client is not authenticated or lacks credentials.
     *
     * @param options - Optional message
     */
    unauthorized(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 401, message: 'Unauthorized', ...options });
    }

    /**
     * Sends a 403 Forbidden response.
     * Use when the client is authenticated but not authorized to access the resource.
     *
     * @param options - Optional message
     */
    forbidden(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 403, message: 'Forbidden', ...options });
    }

    /**
     * Sends a 404 Not Found response.
     * Use when the requested resource could not be located.
     *
     * @param options - Optional message
     */
    notFound(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 404, message: 'Not Found', ...options });
    }

    /**
     * Sends a 406 Not Acceptable response.
     * Use when the server cannot return a response matching the Accept headers.
     *
     * @param options - Optional message
     */
    notAcceptable(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 406, message: 'Not Acceptable', ...options });
    }

    /**
     * Sends a 409 Conflict response.
     * Use when a request could not be completed due to a conflict (e.g., duplicate entry).
     *
     * @param options - Optional message and details
     */
    conflict(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 409, message: 'Conflict', ...options });
    }

    /**
     * Sends a 410 Gone response.
     * Use when the resource is no longer available and will not return.
     *
     * @param options - Optional message
     */
    gone(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 410, message: 'Gone', ...options });
    }

    /**
     * Sends a 415 Unsupported Media Type response.
     * Use when the media format of the request is not supported by the server.
     *
     * @param options - Optional message
     */
    unsupportedMediaType(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 415, message: 'Unsupported Media Type', ...options });
    }

    /**
     * Sends a 422 Unprocessable Entity response.
     * Use when the request is well-formed but cannot be processed due to semantic errors.
     *
     * @param options - Optional validation error details
     */
    unprocessableEntity(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 422, message: 'Unprocessable Entity', ...options });
    }

    /**
     * Sends a 429 Too Many Requests response.
     * Use when the client has sent too many requests in a given amount of time (rate limiting).
     *
     * @param options - Optional retry-after or rate-limit info
     */
    tooManyRequests(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 429, message: 'Too Many Requests', ...options });
    }

    /**
     * Sends a 500 Internal Server Error response.
     * Use when an unexpected server-side error occurs.
     *
     * @param options - Optional message, errors, and headers
     */
    error(options: ErrorResponseOptions = {}): void {
        this.send('error', { statusCode: 500, ...options });
    }

	/**
     * Sends a 500 Internal Server Error response.
     * Use when an unexpected server-side error occurs.
     *
     * @param options - Optional message, errors, and headers
     */
	serverError(options: ErrorResponseOptions = {}): void {
		this.error({ message: 'Internal Server Error', ...options })
	}

    /**
     * Sends a 501 Not Implemented response.
     * Use when the requested functionality is not implemented on the server.
     *
     * @param options - Optional message
     */
    notImplemented(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 501, message: 'Not Implemented', ...options });
    }

    /**
     * Sends a 503 Service Unavailable response.
     * Use when the server is temporarily unavailable due to maintenance or overload.
     *
     * @param options - Optional message
     */
    serviceUnavailable(options: ErrorResponseOptions = {}): void {
        this.error({ statusCode: 503, message: 'Service Unavailable', ...options });
    }
}
