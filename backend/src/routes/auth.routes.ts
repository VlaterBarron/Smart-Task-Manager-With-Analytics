import { Router } from "express";
import type { Request, Response } from "express";
import { signUp, signIn } from "../services/authService.ts";
import { RequestValidation } from "../utils/validations.ts";
import type { RegisterRequest } from "../types/auth.ts";

const authRouter = Router();

authRouter.post('/register', async (req:Request, res:Response) => {

    if(!RequestValidation.validateSignUpBody(req)) {
            return res.status(400).json({error : "Syntax error in auth request body"});
        };
    
    const body : RegisterRequest = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;

    try {
        const authUser = await signUp(req.body);
        res.status(201).json(authUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }

});

authRouter.post('/login',  async (req: Request, res: Response) => {
    if(!RequestValidation.validateLoginBody(req)) {
            return res.status(400).json({error : "Syntax error in auth login body"});
        };

    try {
        const loginUser = await signIn(req.body);
        res.status(201).json(loginUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to Log In user' });
    };
});

export default authRouter;