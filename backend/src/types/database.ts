import type { Database } from "./supabase.ts";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type User = Tables<'User'>;
export type Task = Tables<'Task'>;
export type Category = Tables<'Category'>;
