import type { Database } from "./supabase.ts";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type Profile = Tables<'profiles'>;
export type Task = Tables<'Task'>;
export type Category = Tables<'Category'>;

export type TaskInsert = Database['public']['Tables']['Task']['Insert'];
export type TaskUpdate = Database['public']['Tables']['Task']['Update'];
