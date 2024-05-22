import * as express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import * as customErrors from '../errors';

const logError = (
  err: Error, 
  req: express.Request,
  res: express.Response, 
  next: express.NextFunction
  ): void => {
  console.error(`
  === This is from logError  ===
  ${err.stack}
  === This was from logError ===
  `);
  next(err);
}

/**
 * Handles errors related to authorization
 */
const handleAuthError = (
  err: Error, 
  req: express.Request,
  res: express.Response, 
  next: express.NextFunction
  ): express.Response<{
    message: string
  }, Record<string, any>> | void => {
  if (err instanceof jsonwebtoken.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      "message": "적절하지 않은 토큰입니다"
    });
  }
  else if (err instanceof jsonwebtoken.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      "message": "토큰이 만료되었습니다"
    });
  }
  else {
    next(err);
  }
}

const handleVarError = (
  err: Error, 
  req: express.Request,
  res: express.Response, 
  next: express.NextFunction
): express.Response<{}, Record<string, any>> | void => {
  if (err instanceof customErrors.IdNotConvertableError) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  } 
  else if (err instanceof customErrors.PasswordEqualToPrevError) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  else if (err instanceof customErrors.UserNotFoundError) {
    return res.status(StatusCodes.NOT_FOUND).end();
  }
  else {
    next(err);
  }
}

const asyncWrapper = (fn: (req: express.Request, res: express.Response, next: express.NextFunction) => unknown) => 
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    next(err);
  }
}

export {
  logError,
  handleAuthError,
  handleVarError,
  asyncWrapper
};