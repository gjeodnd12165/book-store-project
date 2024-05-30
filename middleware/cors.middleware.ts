import cors, { CorsOptions } from 'cors';
import * as express from 'express';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export const enableCors = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  corsMiddleware(req, res, next);
}