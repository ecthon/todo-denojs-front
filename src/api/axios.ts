import axios from "axios";
import { ITask, CreateTaskData, UpdateTaskData } from "@/types/todo";

export const api = axios.create({
    baseURL: 'http://localhost:8000/'
})

// Get all tasks
export const getTodos = async (): Promise<ITask[]> => {
    const response = await api.get('/todos');
    return response.data;
};

// Create new task
export const createTodo = async (data: CreateTaskData): Promise<ITask> => {
    const response = await api.post('/todos', data);
    return response.data;
};

// Update task
export const updateTodo = async (id: string, data: UpdateTaskData): Promise<ITask> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
};

// Toggle task status
export const toggleTodo = async (id: string): Promise<{ id: string; completed: boolean }> => {
    // Get current task to know its status
    const todos = await getTodos();
    const currentTodo = todos.find(todo => todo.id === id);
    
    if (!currentTodo) {
        throw new Error('Task not found');
    }
    
    // Use the update endpoint with the completed field
    const response = await api.put(`/todos/${id}`, {
        title: currentTodo.title,
        completed: !currentTodo.completed
    });
    
    return response.data;
};

// Delete task
export const deleteTodo = async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
};