import { Router } from "express";
import type { Request, Response } from "express";
import type { Task, TaskInsert, TaskUpdate } from "../types/database.ts";
import { getAllTasks, createTask, updateTaskById, getTaskById, deleteTaskById } from "../services/taskService.ts";
import { RequestValidation } from "../utils/validations.ts";

const taskRouter = Router();

taskRouter.get('/', async (_, res:Response) => {

    try {

        const tasks: Task[] = await getAllTasks();
        res.json(tasks);

    } catch (error) {

        console.log("Error", error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

taskRouter.post('/', async (req:Request, res:Response) => {

    if(!RequestValidation.validateTaskBody(req)) {
        return res.status(400).json({error : "Syntax error in task request body"});
    }

    const newTask : TaskInsert = req.body;


    try {
        const createdTask = await createTask(newTask);
        res.status(201).json(createdTask);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create tasks' });
    }

});

taskRouter.get('/:id', async (req:Request, res:Response) => {

    const taskId = req.params.id;

    if(!taskId) {
        return res.status(400).json({error : "Syntax error on patching task. ID of the task is null"});
    }
    
    try {
        const fetchedTask = await getTaskById(taskId);
        
        res.status(200).json(fetchedTask);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    };

});

taskRouter.patch('/:id', async (req:Request, res:Response) => {

    const taskId = req.params.id;

    if(!taskId) {
        return res.status(400).json({error : "Syntax error on patching task. ID of the task is null"});
    }

    try {

        await getTaskById(taskId);

    } catch(error) {

        res.status(400).json({ error: 'Task doesn\'t exist' });

    };

    
    const taskBody : TaskUpdate = req.body;


    try {
        const updatedTask = await updateTaskById(taskId, taskBody);
        
        res.status(200).json(updatedTask);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update tasks' });
    };

});

taskRouter.delete('/:id', async (req:Request, res:Response) => {

    const taskId = req.params.id;

    if(!taskId) {
        return res.status(400).json({error : "Syntax error on patching task. ID of the task is null"});
    }

    try {

        await getTaskById(taskId);

    } catch(error) {

        console.log(error);
        res.status(400).json({ error: 'Task doesn\'t exist' });

    };


    try {
        const deletedTask = await deleteTaskById(taskId);
        
        res.status(200).json(deletedTask);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update tasks' });
    };

});

export default taskRouter;