import type { Request } from "express"
import type { TaskInsert } from "../types/database.ts";


export class RequestValidation {
    static validateTaskBody = (req:Request) : boolean =>  {

        const taskBody : TaskInsert = req.body;

        if (!taskBody || !taskBody.title) return false;

        return true;
    };


}