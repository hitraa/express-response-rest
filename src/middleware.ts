import { Response, Request, NextFunction } from 'express';
import { ErrorResponseOptions, HttpResponse, SuccessResponseOptions } from './HttpResponse';

// Augment Express Response type to include our custom methods
declare module 'express-serve-static-core' {
	interface Response {
		success: (options?: SuccessResponseOptions) => void;
		created: (options?: SuccessResponseOptions) => void;
		accepted: (options?: SuccessResponseOptions) => void;
		noContent: () => void;
		badRequest: (options?: ErrorResponseOptions) => void;
		unauthorized: (options?: ErrorResponseOptions) => void;
		forbidden: (options?: ErrorResponseOptions) => void;
		notFound: (options?: ErrorResponseOptions) => void;
		notAcceptable: (options?: ErrorResponseOptions) => void;
		conflict: (options?: ErrorResponseOptions) => void;
		gone: (options?: ErrorResponseOptions) => void;
		unsupportedMediaType: (options?: ErrorResponseOptions) => void;
		unprocessableEntity: (options?: ErrorResponseOptions) => void;
		tooManyRequests: (options?: ErrorResponseOptions) => void;
		error: (options?: ErrorResponseOptions) => void;
		serverError: (options?: ErrorResponseOptions) => void;
		notImplemented: (options?: ErrorResponseOptions) => void;
		serviceUnavailable: (options?: ErrorResponseOptions) => void;
	}
}

/**
 * Express middleware that extends the `res` object with standardized response helpers.
 * Allows calling `res.success()`, `res.error()`, etc. directly in route handlers.
 *
 * @param req Express Request object
 * @param res Express Response object
 * @param next Express NextFunction callback
 */
export function responseMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const httpResponse = new HttpResponse(res);

	res.success = (options?: SuccessResponseOptions): void => httpResponse.success(options);
	res.created = (options?: SuccessResponseOptions): void => httpResponse.created(options);
	res.accepted = (options?: SuccessResponseOptions): void => httpResponse.accepted(options);
	res.noContent = (): void => httpResponse.noContent();
	res.badRequest = (options?: ErrorResponseOptions): void => httpResponse.badRequest(options);
	res.unauthorized = (options?: ErrorResponseOptions): void => httpResponse.unauthorized(options);
	res.forbidden = (options?: ErrorResponseOptions): void => httpResponse.forbidden(options);
	res.notFound = (options?: ErrorResponseOptions): void => httpResponse.notFound(options);
	res.notAcceptable = (options?: ErrorResponseOptions): void => httpResponse.notAcceptable(options);
	res.conflict = (options?: ErrorResponseOptions): void => httpResponse.conflict(options);
	res.gone = (options?: ErrorResponseOptions): void => httpResponse.gone(options);
	res.unsupportedMediaType = (options?: ErrorResponseOptions): void => httpResponse.unsupportedMediaType(options);
	res.unprocessableEntity = (options?: ErrorResponseOptions): void => httpResponse.unprocessableEntity(options);
	res.tooManyRequests = (options?: ErrorResponseOptions): void => httpResponse.tooManyRequests(options);
	res.error = (options?: ErrorResponseOptions): void => httpResponse.error(options);
	res.serverError = (options?: ErrorResponseOptions): void => httpResponse.serverError(options);
	res.notImplemented = (options?: ErrorResponseOptions): void => httpResponse.notImplemented(options);
	res.serviceUnavailable = (options?: ErrorResponseOptions): void => httpResponse.serviceUnavailable(options);

	next();
}
