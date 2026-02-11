import { useState } from "react";
import type { ILogin } from "../types/auth";
import type { ILoginErrors } from "../types/errors";
import { VALID_EMAIL } from "../utils/Validations";
import { supabase } from "../config/supabase";
import { Input } from "../components/Input";

export const LoginPage = () => {
  const SESSION_STORAGE_NAME = "JWT";

  const [form, setForm] = useState<ILogin>({ email: "", password: "" });

  const [errors, setErrors] = useState<ILoginErrors>({
    emailError: "",
    passwordError: "",
  });

  const validateForm = (f: ILogin): ILoginErrors => {
    const errors: ILoginErrors = {};

    if (!f.email.trim()) {
      errors.emailError = "El campo email es requerido";
    } else if (!VALID_EMAIL.test(f.email.trim())) {
      errors.emailError = "El formato del correo electrónico es incorrecto";
    }

    if (!f.password.trim()) {
      errors.passwordError = "El campo contraseña es requerido";
    }

    return errors;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(form);

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;

      sessionStorage.setItem(SESSION_STORAGE_NAME, data.session.access_token);

      return data.session.access_token;
    }
  };

  return (
    <div>
      <h1>Inicia Sesión en SmartTasks</h1>
      <div>
        <form onSubmit={handleSubmit}>
            <Input 
                title="Correo electrónico"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={form.email}
                onChange={(e) => setForm(f => ({...f, email:e.target.value}))}
                inputError={errors.emailError}
            />
            <Input 
                title="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={form.password}
                onChange={(e) => setForm(f => ({...f, password:e.target.value}))}
                inputError={errors.passwordError}
            />
            <button>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};
