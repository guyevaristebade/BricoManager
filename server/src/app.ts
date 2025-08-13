import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares';
import { authRouter, userRouter, toolRouter } from './routes';
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

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/tool', toolRouter);

app.use(errorHandler);

export default app;
