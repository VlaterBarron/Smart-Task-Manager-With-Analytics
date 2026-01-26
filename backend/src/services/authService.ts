import { supabase } from "../config/supabase.ts";
import type { RegisterRequest, LoginRequest } from "../types/auth.ts";


export const signUp = async({email, password, firstName, lastName} : RegisterRequest) => {
    
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options : {
            data : { 
              first_name: firstName,
              last_name: lastName,
              full_name : firstName + " " + lastName
            }
        }
    });

    if (error) throw error;

    return data;
};

export const signIn = async ({ email, password }: LoginRequest) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data.session.access_token;
};