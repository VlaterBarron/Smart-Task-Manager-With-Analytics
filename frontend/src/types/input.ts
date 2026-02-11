export interface IInput {
    title : string,
    type : string, 
    placeholder ?: string, 
    value : string, 
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void, 
    extraClasses ?: string, 
    inputError ?: string
};