import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares';
import { authRouter, userRouter, toolRouter, categoryRouter, locationRouter } from './routes';
import { limiter } from 'helpers';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(','),
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(limiter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/tools', toolRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/locations', locationRouter);

app.use(errorHandler);

export default app;
