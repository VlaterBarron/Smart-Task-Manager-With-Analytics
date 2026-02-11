import { useState } from "react"
import { supabase } from "../config/supabase.ts";
import type { IRegister } from "./../types/register.ts";
import type { IRegisterErrors } from "../types/errors.ts";
import { VALID_EMAIL, VALID_PASSWORD } from "../utils/Validations.ts";

export const RegisterPage = () => {
    const PASSWORD_LENGTH = 8;
    const EMPTY_FILED = "Campo obligatorio vacío";
    const WRONG_EMAIL = "Formato de correo electrónico incorrecto";
    const WRONG_PASSWORD_LENGTH = `La contraseña debe de ser de ${PASSWORD_LENGTH} caracteres o más`;
    const WRONG_PASSWORD = "La contraseña debe de tener minúsculas, mayúsculas y dos números";
    const PASSWORDS_NOT_MATCHING = "Las contraseñas no concuerdan";
    
    const [form, setForm] = useState<IRegister>({
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        confirmPassword : ""
    });

    const [errors, setErrors] = useState<IRegisterErrors>({
        firstnameError : "",
        lastnameError : "",
        emailError : "",
        passwordError : "",
        confirmPasswordError : ""
    });

    const validateForm = (f : IRegister) : IRegisterErrors => {
        const errors : IRegisterErrors = {};

        if(!f.firstname.trim()){
            errors.firstnameError = EMPTY_FILED;
        }

        if(!f.lastname.trim()){
            errors.lastnameError = EMPTY_FILED;
        }

        if(!f.email.trim()){
            errors.emailError = EMPTY_FILED;
        } else if(!VALID_EMAIL.test(f.email.trim())) {
            errors.emailError = WRONG_EMAIL;
        }

        if(!f.password.trim()){
            errors.passwordError = EMPTY_FILED;
        } else if(f.password.trim().length < PASSWORD_LENGTH) {
            errors.passwordError = WRONG_PASSWORD_LENGTH;
        } else if(!VALID_PASSWORD.test(f.password)){
            errors.passwordError = WRONG_PASSWORD
        }

        if(!f.confirmPassword.trim()){
            errors.confirmPasswordError = EMPTY_FILED;
        } else if(f.confirmPassword !== f.password){
            errors.confirmPasswordError = PASSWORDS_NOT_MATCHING
        }
        
        console.log(errors);
        setErrors(errors);
        
        return errors;
    };

    const onSubmit = (event:React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const errors = validateForm(form);

        if(Object.keys(errors).length !== 0) {
            console.log("Errors exist");
            return;
        }

        console.log(form);
        signUp(form);
    };

    const signUp = async({email, password, firstname, lastname} : IRegister) => {
    
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options : {
            data : { 
              first_name: firstname,
              last_name: lastname,
              full_name : firstname + " " + lastname
            }
        }
    });

    console.log(data);

    if (error) throw error;

    return data;
};

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <h1>Regístrate a SmartTasks</h1>
                </div>
                <div>
                    <p>Primer Nombre</p>
                    <input 
                        type="text" 
                        onChange={(e) => setForm(f => ({...f, firstname:e.target.value}))}
                    />
                    {
                        errors.firstnameError && <p>{errors.firstnameError}</p>
                    }
                    <p>Segundo Nombre</p>
                    <input 
                        type="text" 
                        onChange={(e) => setForm(f => ({...f, lastname:e.target.value}))}
                    />
                    {
                        errors.lastnameError && <p>{errors.lastnameError}</p>
                    }
                    <p>Correo electrónico</p>
                    <input 
                        type="email" 
                        onChange={(e) => setForm(f => ({...f, email:e.target.value}))}
                    />
                    {
                        errors.emailError && <p>{errors.emailError}</p>
                    }
                    <p>Contraseña</p>
                    <input 
                        type="password" 
                        onChange={(e) => setForm(f => ({...f, password:e.target.value}))}
                    />
                    {
                        errors.passwordError && <p>{errors.passwordError}</p>
                    }
                    <p>Confirma tu contraseña</p>
                    <input 
                        type="password" 
                        onChange={(e) => setForm(f => ({...f, confirmPassword:e.target.value}))}
                    />
                    {
                        errors.confirmPasswordError && <p>{errors.confirmPasswordError}</p>
                    }
                </div>
                <button>Registrarse</button>
            </form>
        </div>
    )

}