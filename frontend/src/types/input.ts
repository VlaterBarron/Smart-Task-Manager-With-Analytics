export interface IInput {
    title : string,
    type : InputType, 
    placeholder ?: string, 
    value : string, 
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void, 
    extraClasses ?: string, 
    inputError ?: string
};

type InputType = "text" | "email" | "password";