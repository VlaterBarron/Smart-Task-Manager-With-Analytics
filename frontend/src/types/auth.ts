interface IRegister {
    firstname : string,
    lastname : string,
    email: string,
    password: string,
    confirmPassword: string
};

interface ILogin {
    email: string,
    password : string
};

export type{
    IRegister,
    ILogin
};