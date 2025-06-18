import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const toggleTodo = async (id: string) => {
    const response = await api.put(`/todos/${id}/toggle`);
    return response.data;
};