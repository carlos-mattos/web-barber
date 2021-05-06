import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import '@shared/container';
import { errors } from 'celebrate';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(errors());
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }

    console.error(err);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
);

app.listen(3333, () => {
  console.log('listening on port 3333');
});
