import { Router } from "express";
import taskRouter from "./task.routes.ts";
import authRouter from "./auth.routes.ts";

const rootRouter = Router();

rootRouter.use('/tasks', taskRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;