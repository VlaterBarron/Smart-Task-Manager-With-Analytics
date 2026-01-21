import type { Task, TaskInsert, TaskUpdate } from "../types/database.ts";
import { supabase } from "../config/supabase.ts";

export const getAllTasks = async (): Promise<Task[]> => {
    const { data, error } = await supabase.from('Task').select('*');
    console.log(data);

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    };

    return data;
};

export const getTaskById = async (id : number): Promise<Task> => {

  const { data, error } = await supabase.from('Task').select('*').eq('id', id).single();

  if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    };

  return data;

};

export const createTask = async (taskData : TaskInsert): Promise<Task> => {
    const { data, error } = await supabase.from('Task').insert(taskData).select().single();

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    };

  return data;

};

export const updateTaskById = async (id : number, taskData : TaskUpdate) : Promise<Task> => {

  const { data, error } = await supabase.from('Task').update(taskData).eq('id', id).select().single();

  if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
  };

    return data;

};

export const deleteTaskById = async (id : number) : Promise<Task> => {

   const { data, error } = await supabase.from('Task').delete().eq('id', id).select().single();

  if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
  };

    return data;

};