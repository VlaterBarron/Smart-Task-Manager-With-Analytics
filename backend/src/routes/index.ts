import { Router } from "express";
import taskRouter from "./task.routes.ts";

const rootRouter = Router();

rootRouter.use('/tasks', taskRouter);

export default rootRouter;