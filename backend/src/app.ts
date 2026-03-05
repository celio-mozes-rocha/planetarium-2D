import express from 'express';
import cors from 'cors';
import searchRouter from './routes/search.js';

const app = express();

app.use(cors());
app.use('/api/search', searchRouter);

export default app;