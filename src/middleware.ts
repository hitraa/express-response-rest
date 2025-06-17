import { Response, Request, NextFunction } from 'express';
import { HttpResponse } from './HttpResponse';

// Augment Express Response type to include our custom methods
declare module 'express-serve-static-core' {
  interface Response {
    success: (options?: any) => void;
    created: (options?: any) => void;
    accepted: (options?: any) => void;
    noContent: () => void;
    badRequest: (options?: any) => void;
    unauthorized: (options?: any) => void;
    forbidden: (options?: any) => void;
    notFound: (options?: any) => void;
    notAcceptable: (options?: any) => void;
    conflict: (options?: any) => void;
    gone: (options?: any) => void;
    unsupportedMediaType: (options?: any) => void;
    unprocessableEntity: (options?: any) => void;
    tooManyRequests: (options?: any) => void;
    error: (options?: any) => void;
    serverError: (options?: any) => void;
    notImplemented: (options?: any) => void;
    serviceUnavailable: (options?: any) => void;
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

	res.success = httpResponse.success;
	res.created = httpResponse.created;
	res.accepted = httpResponse.accepted;
	res.noContent = httpResponse.noContent;
	res.badRequest = httpResponse.badRequest;
	res.unauthorized = httpResponse.unauthorized;
	res.forbidden = httpResponse.forbidden;
	res.notFound = httpResponse.notFound;
	res.notAcceptable = httpResponse.notAcceptable;
	res.conflict = httpResponse.conflict;
	res.gone = httpResponse.gone;
	res.unsupportedMediaType = httpResponse.unsupportedMediaType;
	res.unprocessableEntity = httpResponse.unprocessableEntity;
	res.tooManyRequests = httpResponse.tooManyRequests;
	res.error = httpResponse.error;
	res.serverError = httpResponse.serverError;
	res.notImplemented = httpResponse.notImplemented;
	res.serviceUnavailable = httpResponse.serviceUnavailable;

	next();
}
