import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { handleError } from './errors/handleErros';
import userRouter from './routes/users.routes';
import sessionRouter from './routes/session.routes';
import categoriesRouter from './routes/categories.routes';
import realEstateRouter from './routes/realEstates.routes';
import schedulesRouter from './routes/schedules.routes';

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRouter);
app.use("/realEstate", realEstateRouter);
app.use("/schedules", schedulesRouter);


app.use(handleError)
export default app;
