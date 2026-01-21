export interface Profile {
    firstName : string, 
    lastName : string,
    user_id: string,
    completedTasksTotal ?: number,
    completedTasksMonth ?: number,
    completedTasksYear ?: number
};