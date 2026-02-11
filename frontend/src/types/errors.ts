interface IRegisterErrors {
    firstnameError ?: string,
    lastnameError ?: string,
    emailError ?: string,
    passwordError ?: string,
    confirmPasswordError ?: string
};

interface ILoginErrors {
    emailError ?: string,
    passwordError ?: string
};

export type {
    IRegisterErrors,
    ILoginErrors
}