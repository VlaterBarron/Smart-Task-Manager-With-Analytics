import express from 'express';
import rootRouter from './routes/index.ts';

const app = express();
const PATH = '/api/v0';

app.use(express.json());

app.use(PATH, rootRouter);

export default app;