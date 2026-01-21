import type { Request } from "express"
import type { TaskInsert } from "../types/database.ts";
import type { LoginRequest, RegisterRequest } from "../types/auth.ts";

const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

export class RequestValidation {
    static validateTaskBody = (req:Request) : boolean =>  {

        const taskBody : TaskInsert = req.body;

        if (!taskBody || !taskBody.title) return false;

        return true;
    };

    static validateSignUpBody = (req:Request) : boolean =>  {

        const signUpBody : RegisterRequest = req.body;

        if (!signUpBody.email || !signUpBody.password || !signUpBody.firstName || !signUpBody.lastName) return false;

        return EMAIL_REGEX.test(signUpBody.email);
    };

    static validateLoginBody = (req:Request) : boolean =>  {

        const signUpBody : LoginRequest = req.body;

        if (!signUpBody.email || !signUpBody.password) return false;

        return EMAIL_REGEX.test(signUpBody.email);
    };

}